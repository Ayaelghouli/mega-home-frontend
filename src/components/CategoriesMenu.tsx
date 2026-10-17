import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../data/products';

/**
 * Bouton « Toutes les catégories » + panneau déroulant.
 * Se ferme : clic en dehors, touche Échap, changement de page.
 * Les catégories viennent de CATEGORIES (src/data/products.ts) :
 * en ajouter une là-bas la fait apparaître ici automatiquement.
 */
export default function CategoriesMenu({ variante = 'clair' }: { variante?: 'clair' | 'sombre' }) {
  const [ouvert, setOuvert] = useState(false);
  const conteneur = useRef<HTMLDivElement>(null);
  const { pathname, search } = useLocation();

  // Ferme le menu quand on change de page
  useEffect(() => setOuvert(false), [pathname, search]);

  // Ferme au clic en dehors et sur Échap
  useEffect(() => {
    if (!ouvert) return;
    const clic = (e: MouseEvent) => {
      if (conteneur.current && !conteneur.current.contains(e.target as Node)) setOuvert(false);
    };
    const touche = (e: KeyboardEvent) => e.key === 'Escape' && setOuvert(false);
    document.addEventListener('mousedown', clic);
    document.addEventListener('keydown', touche);
    return () => {
      document.removeEventListener('mousedown', clic);
      document.removeEventListener('keydown', touche);
    };
  }, [ouvert]);

  return (
    <div ref={conteneur} className="relative">
      <button
        type="button"
        onClick={() => setOuvert(o => !o)}
        aria-expanded={ouvert}
        aria-haspopup="true"
        className={`flex items-center gap-2 text-sm font-semibold hover:text-[#C9992C] transition ${variante === 'sombre' ? 'text-white' : 'text-[#1A1A1A]'}`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span>Toutes les catégories</span>
      </button>

      {ouvert && (
        <div
          className="absolute left-0 top-full mt-3 z-50 w-[min(92vw,640px)] bg-white border border-[#E5E3DE] rounded-xl shadow-xl p-4"
          role="menu"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.name}
                to={`/catalogue?cat=${encodeURIComponent(cat.name)}`}
                role="menuitem"
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#F7F5F0] transition"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-sm font-medium text-[#1A1A1A] leading-tight">{cat.name}</span>
              </Link>
            ))}
          </div>

          <div className="border-t border-[#E5E3DE] mt-3 pt-3">
            <Link
              to="/catalogue"
              className="text-sm font-semibold text-[#C9992C] hover:underline"
            >
              Voir tout le catalogue →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}