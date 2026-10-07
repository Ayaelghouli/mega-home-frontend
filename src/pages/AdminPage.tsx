import { useState, useEffect } from "react"
import { CATEGORIES, type Product, type Category } from "../data/products"
import {
  fetchProduits,
  fetchMarques,
  login,
  getToken,
  clearToken,
  creerProduit,
  modifierProduit,
  supprimerProduit,
} from "../lib/api"

type Tab = "products" | "add"

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [envoi, setEnvoi] = useState(false)

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setEnvoi(true)
    const ok = await login(email, password)
    setEnvoi(false)
    if (ok) {
      onLogin()
    } else {
      setError("Identifiants incorrects.")
    }
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#C9992C] flex items-center justify-center mx-auto mb-3">
            <span className="text-[#C9992C] font-bold text-2xl">M</span>
          </div>
          <h1 className="text-white text-xl font-bold">Mega Home Admin</h1>
          <p className="text-white/40 text-sm mt-1">
            Panneau de gestion interne
          </p>
        </div>
        <form
          onSubmit={handle}
          className="bg-[#232323] rounded-xl p-6 space-y-4"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-3 py-2 rounded-lg">
              {error}
            </div>
          )}
          <div>
            <label className="block text-xs text-white/60 font-semibold uppercase tracking-widest mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@megahome.ma"
              className="w-full bg-[#1A1A1A] border border-white/10 text-white text-sm px-3 py-2.5 rounded-lg outline-none focus:border-[#C9992C] transition"
            />
          </div>
          <div>
            <label className="block text-xs text-white/60 font-semibold uppercase tracking-widest mb-1.5">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#1A1A1A] border border-white/10 text-white text-sm px-3 py-2.5 rounded-lg outline-none focus:border-[#C9992C] transition"
            />
          </div>
          <button
            type="submit"
            disabled={envoi}
            className="w-full bg-[#C9992C] hover:bg-[#D9A941] text-[#1A1A1A] font-bold py-2.5 rounded-lg transition text-sm disabled:opacity-50"
          >
            {envoi ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  )
}

const emptyForm = {
  name: "",
  brand: "",
  reference: "",
  category: "Réfrigérateurs" as Category,
  price: "",
  stock: "",
  photos: "",
  promo: false,
  description: "",
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(!!getToken())
  const [tab, setTab] = useState<Tab>("products")
  const [products, setProducts] = useState<Product[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [chargement, setChargement] = useState(true)
  const [search, setSearch] = useState("")
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [erreurForm, setErreurForm] = useState("")

  function chargerProduits() {
    setChargement(true)
    fetchProduits({ limite: 500 })
      .then(setProducts)
      .finally(() => setChargement(false))
  }

  useEffect(() => {
    if (!loggedIn) return
    chargerProduits()
    fetchMarques()
      .then(setBrands)
      .catch(() => {})
  }, [loggedIn])

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />

  const filtered = products.filter(
    (p) =>
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.reference.toLowerCase().includes(search.toLowerCase()),
  )

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce produit ?")) return
    const ok = await supprimerProduit(id)
    if (ok) chargerProduits()
  }

  function handleEdit(product: Product) {
    setEditingId(product.id)
    setForm({
      name: product.name,
      brand: product.brand,
      reference: product.reference,
      category: product.category,
      price: String(product.price),
      stock: "0",
      photos: product.images
        .filter((i) => !i.includes("placeholder"))
        .join(", "),
      promo: !!product.promoLabel,
      description: product.description,
    })
    setTab("add")
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setErreurForm("")

    const donnees = {
      reference: form.reference,
      designation: form.name,
      categorie: form.category,
      marque: form.brand,
      prix: Number(form.price),
      stock: Number(form.stock) || 0,
      photos: form.photos
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
      promo: form.promo,
    }

    const ok = editingId
      ? await modifierProduit(editingId, donnees)
      : await creerProduit(donnees)

    if (!ok) {
      setErreurForm(
        "L'enregistrement a échoué — vérifie que la référence n'existe pas déjà.",
      )
      return
    }

    setForm(emptyForm)
    setEditingId(null)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
    setTab("products")
    chargerProduits()
  }

  return (
    <div className="min-h-screen bg-[#111C1C] text-white flex">
      {/* Sidebar */}
      <aside className="w-52 flex-shrink-0 bg-[#1A1A1A] border-r border-white/10 flex flex-col">
        <div className="px-4 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#C9992C] flex items-center justify-center">
              <span className="text-[#C9992C] font-bold text-sm">M</span>
            </div>
            <span className="text-white font-semibold text-sm">
              Admin Panel
            </span>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {([
            ["products", "📦", "Produits"],
            ["add", "➕", "Ajouter"],
          ] as const).map(([key, icon, label]) => (
            <button
              key={key}
              onClick={() => {
                setTab(key)
                if (key === "add") {
                  setEditingId(null)
                  setForm(emptyForm)
                }
              }}
              className={`w-full flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition ${
                tab === key
                  ? "bg-[#C9992C] text-white"
                  : "text-white/60 hover:bg-white/5"
              }`}
            >
              <span>{icon}</span> {label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button
            onClick={() => {
              clearToken()
              setLoggedIn(false)
            }}
            className="w-full text-sm text-white/40 hover:text-white/80 py-2 transition text-left px-3"
          >
            ← Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Topbar */}
        <div className="bg-[#1A1A1A] border-b border-white/10 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
          <h1 className="font-semibold text-sm">
            {tab === "products"
              ? `Produits (${products.length})`
              : editingId
                ? "Modifier le produit"
                : "Ajouter un produit"}
          </h1>
          {saved && (
            <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/20">
              ✓ Enregistré
            </span>
          )}
        </div>

        <div className="p-6">
          {/* ── Products tab ── */}
          {tab === "products" && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un produit..."
                  className="bg-[#1A1A1A] border border-white/10 text-white text-sm px-3 py-2 rounded-lg outline-none focus:border-[#C9992C] transition w-64"
                />
                <span className="text-white/40 text-xs">
                  {filtered.length} résultat{filtered.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="rounded-xl overflow-hidden border border-white/10">
                {chargement ? (
                  <div className="bg-[#1E1E1E] text-white/40 text-sm text-center py-10">
                    Chargement...
                  </div>
                ) : (
                  <table className="w-full text-sm">
                    <thead className="bg-[#1A1A1A] text-white/50 text-xs uppercase tracking-widest">
                      <tr>
                        <th className="px-4 py-3 text-left">Produit</th>
                        <th className="px-4 py-3 text-left hidden md:table-cell">
                          Réf.
                        </th>
                        <th className="px-4 py-3 text-left hidden lg:table-cell">
                          Catégorie
                        </th>
                        <th className="px-4 py-3 text-right">Prix</th>
                        <th className="px-4 py-3 text-center">Stock</th>
                        <th className="px-4 py-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filtered.map((product) => (
                        <tr
                          key={product.id}
                          className="bg-[#1E1E1E] hover:bg-[#282828] transition"
                        >
                          <td className="px-4 py-3">
                            <div className="font-medium text-white truncate max-w-[200px]">
                              {product.name}
                            </div>
                            <div className="text-white/40 text-xs">
                              {product.brand}
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell text-white/50 font-mono text-xs">
                            {product.reference}
                          </td>
                          <td className="px-4 py-3 hidden lg:table-cell text-white/60">
                            {product.category}
                          </td>
                          <td className="px-4 py-3 text-right font-mono font-semibold text-[#C9992C]">
                            {product.price.toLocaleString("fr-MA")} DH
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span
                              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                product.inStock
                                  ? "bg-green-500/15 text-green-400"
                                  : "bg-red-500/15 text-red-400"
                              }`}
                            >
                              {product.inStock ? "En stock" : "Rupture"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleEdit(product)}
                                className="text-xs text-[#C9992C] hover:text-[#D9A941] transition font-medium"
                              >
                                Modifier
                              </button>
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="text-xs text-red-400 hover:text-red-300 transition"
                              >
                                Suppr.
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* ── Add/Edit tab ── */}
          {tab === "add" && (
            <form onSubmit={handleSave} className="max-w-2xl space-y-5">
              {erreurForm && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-3 py-2 rounded-lg">
                  {erreurForm}
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label>Nom du produit</Label>
                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Ex: Réfrigérateur No Frost 400L"
                    required
                  />
                </div>
                <div>
                  <Label>Référence</Label>
                  <Input
                    value={form.reference}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, reference: e.target.value }))
                    }
                    placeholder="SAM-RF400NF"
                    required
                  />
                </div>
                <div>
                  <Label>Marque</Label>
                  <Input
                    value={form.brand}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, brand: e.target.value }))
                    }
                    placeholder="Samsung, LG, TCL..."
                    list="marques-existantes"
                    required
                  />
                  <datalist id="marques-existantes">
                    {brands.map((b) => (
                      <option key={b} value={b} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <Label>Catégorie</Label>
                  <Select
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        category: e.target.value as Category,
                      }))
                    }
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.name}>{c.name}</option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label>Prix (DH)</Label>
                  <Input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, price: e.target.value }))
                    }
                    placeholder="4990"
                    required
                  />
                </div>
                <div>
                  <Label>Stock (quantité)</Label>
                  <Input
                    type="number"
                    value={form.stock}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, stock: e.target.value }))
                    }
                    placeholder="0"
                  />
                </div>
                <div className="flex items-center gap-3 pt-5">
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, promo: !f.promo }))}
                    className={`w-10 h-6 rounded-full transition-colors relative ${
                      form.promo ? "bg-[#C9992C]" : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                        form.promo ? "left-5" : "left-1"
                      }`}
                    />
                  </button>
                  <span className="text-sm text-white/70">En promotion</span>
                </div>
                <div className="col-span-2">
                  <Label>Description</Label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                    placeholder="Description courte du produit..."
                    rows={3}
                    className="w-full bg-[#1A1A1A] border border-white/10 text-white text-sm px-3 py-2 rounded-lg outline-none focus:border-[#C9992C] transition resize-none"
                  />
                </div>
                {/* Photos */}
                <div className="col-span-2">
                  <Label>
                    Photos du produit — URLs séparées par des virgules
                  </Label>
                  <textarea
                    value={form.photos}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, photos: e.target.value }))
                    }
                    placeholder="https://.../photo1.jpg, https://.../photo2.jpg"
                    rows={2}
                    className="w-full bg-[#1A1A1A] border border-white/10 text-white text-sm px-3 py-2 rounded-lg outline-none focus:border-[#C9992C] transition resize-none"
                  />
                  <p className="text-white/30 text-xs mt-1">
                    Colle les liens Google Drive/hébergement des photos —
                    l'upload direct arrivera plus tard.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-[#C9992C] hover:bg-[#D9A941] text-[#1A1A1A] font-bold px-6 py-2.5 rounded-lg transition text-sm"
                >
                  {editingId
                    ? "Enregistrer les modifications"
                    : "Ajouter le produit"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTab("products")
                    setEditingId(null)
                    setForm(emptyForm)
                  }}
                  className="text-white/50 hover:text-white px-6 py-2.5 rounded-lg border border-white/10 hover:border-white/20 transition text-sm"
                >
                  Annuler
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs text-white/50 font-semibold uppercase tracking-widest mb-1.5">
      {children}
    </label>
  )
}

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full bg-[#1A1A1A] border border-white/10 text-white text-sm px-3 py-2 rounded-lg outline-none focus:border-[#C9992C] transition"
    />
  )
}

function Select({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="w-full bg-[#1A1A1A] border border-white/10 text-white text-sm px-3 py-2 rounded-lg outline-none focus:border-[#C9992C] transition"
    >
      {children}
    </select>
  )
}
