import type { Product, Category } from '../data/products';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// ── Forme des données telles qu'elles sortent du backend ──
interface ApiProduit {
  _id: string;
  reference: string;
  designation: string;
  categorie: string;
  sous_categorie?: string | null;
  marque: string;
  prix: number | null;
  prix_fournisseur?: number | null;
  stock: number;
  photos: string[];
  promo: boolean;
}

// ── Adaptateur : transforme un produit backend en `Product` (forme utilisée par les composants) ──
function versProduct(p: ApiProduit): Product {
  return {
    id: p._id,
    name: p.designation,
    brand: p.marque,
    reference: p.reference,
    category: p.categorie as Category,
    price: p.prix ?? 0,
    originalPrice: undefined,
    promoLabel: p.promo ? 'PROMO' : undefined,
    inStock: p.stock > 0,
    images: p.photos && p.photos.length > 0
      ? p.photos.map(nom => nom.startsWith('http') ? nom : `${API_URL}/static/photos/${nom}`)
      : ['/placeholder-produit.png'],
    specs: [],
    description: '',
  };
}

interface FiltresProduits {
  categorie?: string;
  marque?: string;
  q?: string;
  prixMin?: number;
  prixMax?: number;
  promo?: boolean;
  limite?: number;
}

export async function fetchProduits(filtres: FiltresProduits = {}): Promise<Product[]> {
  const params = new URLSearchParams({ limite: String(filtres.limite ?? 100) });
  if (filtres.categorie) params.set('categorie', filtres.categorie);
  if (filtres.marque) params.set('marque', filtres.marque);
  if (filtres.q) params.set('q', filtres.q);
  if (filtres.prixMin) params.set('prix_min', String(filtres.prixMin));
  if (filtres.prixMax) params.set('prix_max', String(filtres.prixMax));
  if (filtres.promo) params.set('promo', 'true');

  const res = await fetch(`${API_URL}/produits/?${params.toString()}`);
  if (!res.ok) throw new Error('Erreur lors du chargement des produits');
  const data = await res.json();
  return (data.produits as ApiProduit[]).map(versProduct);
}

export async function fetchProduit(id: string): Promise<Product | null> {
  const res = await fetch(`${API_URL}/produits/${id}`);
  if (!res.ok) return null;
  return versProduct(await res.json());
}

export async function fetchMarques(): Promise<string[]> {
  const res = await fetch(`${API_URL}/marques/`);
  if (!res.ok) return [];
  return res.json();
}

// ── Authentification admin ──
const TOKEN_KEY = 'mega_home_admin_token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function login(email: string, mot_de_passe: string): Promise<boolean> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, mot_de_passe }),
  });
  if (!res.ok) return false;
  const data = await res.json();
  setToken(data.access_token);
  return true;
}

function headersAuth(): HeadersInit {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ── Forme des données envoyées vers le backend pour créer/modifier un produit ──
export interface ProduitFormulaire {
  reference: string;
  designation: string;
  categorie: string;
  sous_categorie?: string;
  marque: string;
  prix: number;
  stock: number;
  photos: string[];
  promo: boolean;
}

export async function creerProduit(donnees: ProduitFormulaire): Promise<boolean> {
  const res = await fetch(`${API_URL}/produits/`, {
    method: 'POST',
    headers: headersAuth(),
    body: JSON.stringify(donnees),
  });
  return res.ok;
}

export async function modifierProduit(id: string, donnees: Partial<ProduitFormulaire>): Promise<boolean> {
  const res = await fetch(`${API_URL}/produits/${id}`, {
    method: 'PUT',
    headers: headersAuth(),
    body: JSON.stringify(donnees),
  });
  return res.ok;
}

export async function supprimerProduit(id: string): Promise<boolean> {
  const res = await fetch(`${API_URL}/produits/${id}`, {
    method: 'DELETE',
    headers: headersAuth(),
  });
  return res.ok;
}