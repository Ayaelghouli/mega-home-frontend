import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { CATEGORIES, type Category, type Product } from "../data/products"
import { fetchProduits, fetchMarques } from "../lib/api"
import ProductCard from "../components/ProductCard"

const PRICE_RANGES = [
  { label: "Tous les prix", min: 0, max: Infinity },
  { label: "Moins de 2 000 DH", min: 0, max: 2000 },
  { label: "2 000 – 5 000 DH", min: 2000, max: 5000 },
  { label: "5 000 – 10 000 DH", min: 5000, max: 10000 },
  { label: "Plus de 10 000 DH", min: 10000, max: Infinity },
]

export default function CataloguePage() {
  const [params, setParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(params.get("q") || "")
  const [selectedCategory, setSelectedCategory] = useState<Category | "">(
    params.get("cat") as Category || "",
  )
  const [selectedBrand, setSelectedBrand] = useState("")
  const [priceRangeIdx, setPriceRangeIdx] = useState(0)
  const [showPromoOnly] = useState(params.get("promo") === "true")

  const [produits, setProduits] = useState<Product[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState<string | null>(null)

  useEffect(() => {
    fetchMarques()
      .then(setBrands)
      .catch(() => {})
  }, [])

  useEffect(() => {
    setChargement(true)
    setErreur(null)
    const range = PRICE_RANGES[priceRangeIdx]
    const minuteur = setTimeout(() => {
      fetchProduits({
        categorie: selectedCategory || undefined,
        marque: selectedBrand || undefined,
        q: searchQuery || undefined,
        prixMin: range.min || undefined,
        prixMax: range.max === Infinity ? undefined : range.max,
        promo: showPromoOnly || undefined,
        limite: 1000,
      })
        .then(setProduits)
        .catch(() =>
          setErreur(
            "Impossible de contacter le serveur. Vérifie que le backend tourne.",
          ),
        )
        .finally(() => setChargement(false))
    }, 250)
    return () => clearTimeout(minuteur)
  }, [
    selectedCategory,
    selectedBrand,
    priceRangeIdx,
    searchQuery,
    showPromoOnly,
  ])

  const filtered = useMemo(() => produits, [produits])

  function clearFilters() {
    setSelectedCategory("")
    setSelectedBrand("")
    setPriceRangeIdx(0)
    setSearchQuery("")
    setParams({})
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="bg-[#1A1A1A] text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1
            className="text-3xl mb-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {selectedCategory || "Catalogue complet"}
          </h1>
          <p className="text-white/50 text-sm">
            {filtered.length} produit{filtered.length !== 1 ? "s" : ""} trouvé
            {filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">
        {/* ── Sidebar filters ── */}
        <aside className="lg:w-60 flex-shrink-0 self-start">
          <div className="bg-white rounded-xl border border-[#E5E3DE] p-5 sticky top-28">
            {/* Search */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-[#1A1A1A] uppercase tracking-widest mb-2">
                Recherche
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Produit, marque..."
                className="w-full text-sm border border-[#E5E3DE] rounded-lg px-3 py-2 outline-none focus:border-[#C9992C] transition"
              />
            </div>

            {/* Categories */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-[#1A1A1A] uppercase tracking-widest mb-2">
                Catégorie
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition ${
                    !selectedCategory
                      ? "bg-[#1A1A1A] text-white"
                      : "hover:bg-[#F7F5F0] text-[#1A1A1A]"
                  }`}
                >
                  Toutes les catégories
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition flex items-center gap-2 ${
                      selectedCategory === cat.name
                        ? "bg-[#C9992C] text-white"
                        : "hover:bg-[#F7F5F0] text-[#1A1A1A]"
                    }`}
                  >
                    <span>{cat.icon}</span> {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-[#1A1A1A] uppercase tracking-widest mb-2">
                Prix
              </label>
              <div className="space-y-1">
                {PRICE_RANGES.map((range, i) => (
                  <button
                    key={range.label}
                    onClick={() => setPriceRangeIdx(i)}
                    className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition ${
                      priceRangeIdx === i
                        ? "bg-[#C9992C] text-white"
                        : "hover:bg-[#F7F5F0] text-[#1A1A1A]"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-[#1A1A1A] uppercase tracking-widest mb-2">
                Marque
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedBrand("")}
                  className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition ${
                    !selectedBrand
                      ? "bg-[#1A1A1A] text-white"
                      : "hover:bg-[#F7F5F0] text-[#1A1A1A]"
                  }`}
                >
                  Toutes les marques
                </button>
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition ${
                      selectedBrand === brand
                        ? "bg-[#C9992C] text-white"
                        : "hover:bg-[#F7F5F0] text-[#1A1A1A]"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="w-full text-sm text-[#1A1A1A] border border-[#1A1A1A] py-2 rounded-lg hover:bg-[#1A1A1A] hover:text-white transition"
            >
              Réinitialiser les filtres
            </button>
          </div>
        </aside>

        {/* ── Product grid ── */}
        <main className="flex-1">
          {chargement ? (
            <div className="text-center py-24 text-[#1A1A1A]/40">
              <p className="font-medium">Chargement des produits...</p>
            </div>
          ) : erreur ? (
            <div className="text-center py-24 text-[#C9992C]">
              <p className="font-medium">{erreur}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-[#1A1A1A]/40">
              <p className="text-5xl mb-4">🔍</p>
              <p className="font-medium">Aucun produit trouvé</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-sm text-[#C9992C] underline"
              >
                Effacer les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
