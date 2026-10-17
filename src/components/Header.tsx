import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoIcon from './LogoIcon';
import CategoriesMenu from './CategoriesMenu';
import { useListe } from '../context/ListeContext';
import { CATEGORIES } from '../data/products';

const TEL = '+212 6 61 30 67 32';
const WA = '212661306732';
const lienSav = `https://wa.me/${WA}?text=${encodeURIComponent(
  'Bonjour, j’ai besoin du service après-vente.\nProduit concerné : \nN° de facture : \nProblème rencontré : ',
)}`;

export default function Header() {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { count, setOuvert } = useListe();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate(`/catalogue?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      {/* ── Bandeau d'infos (défile avec la page) ── */}
      <div className="bg-[#C9992C] text-[#1A1A1A] text-xs font-medium">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-x-5 gap-y-1 flex-wrap">
            <span>🚚 Livraison Rabat · Salé · Kénitra</span>
            <span className="hidden sm:inline">🔧 Installation professionnelle</span>
          </div>
          <div className="flex items-center gap-x-5">
            <span className="hidden md:inline">📍 Showroom à Salé</span>
            <a href="tel:+212661306732" className="font-semibold hover:underline">
              📞 {TEL}
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-[#1A1A1A] shadow-lg">
        {/* ── Ligne principale ── */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3 md:gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2.5" aria-label="Mega Home Equipement – accueil">
            <LogoIcon taille={44} />
            <div className="hidden sm:block">
              <div className="text-white font-bold text-base leading-tight tracking-tight">
                Mega<span className="text-[#C9992C]">Home</span>
              </div>
              <div className="text-white/60 text-[9px] uppercase tracking-[0.2em] leading-tight">
                Equipement
              </div>
              <div
                className="text-[#C9992C] text-[11px] leading-none mt-0.5 italic"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                Votre maison, notre priorité
              </div>
            </div>
          </Link>

          {/* Recherche */}
          <form onSubmit={handleSearch} className="flex-1 flex min-w-0">
            <div className="relative w-full flex">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Rechercher un appareil, une marque..."
                className="w-full min-w-0 pl-4 pr-3 py-2 rounded-l-lg bg-white/10 border border-white/15 text-white placeholder-white/40 text-sm outline-none focus:bg-white/15 transition"
              />
              <button
                type="submit"
                className="px-3 sm:px-4 py-2 bg-[#C9992C] text-[#1A1A1A] font-semibold text-sm rounded-r-lg hover:bg-[#D9A941] transition"
                aria-label="Rechercher"
              >
                <span className="hidden sm:inline">Rechercher</span>
                <span className="sm:hidden">🔍</span>
              </button>
            </div>
          </form>

          {/* Ma liste */}
          <button
            type="button"
            onClick={() => setOuvert(true)}
            className="relative flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-white hover:bg-white/10 transition"
            aria-label={`Ma liste (${count} article${count > 1 ? 's' : ''})`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 6h15l-1.5 9h-12z" />
              <path d="M6 6L5 3H2" />
              <circle cx="9" cy="20" r="1.3" />
              <circle cx="18" cy="20" r="1.3" />
            </svg>
            <span className="hidden lg:inline text-sm font-medium">Ma liste</span>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-[#C9992C] text-[#1A1A1A] text-[11px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${WA}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex flex-shrink-0 items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-lg text-sm font-medium transition"
          >
            <WhatsAppIcon />
            <span>Commander</span>
          </a>

          {/* Menu mobile */}
          <button
            className="md:hidden flex-shrink-0 text-white p-1 text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* ── Navigation (écran large) ── */}
        <nav className="hidden md:block border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-7 text-sm py-2.5">
            <CategoriesMenu variante="sombre" />
            <Link to="/" className="text-white/70 hover:text-[#C9992C] transition">Accueil</Link>
            <Link to="/catalogue" className="text-white/70 hover:text-[#C9992C] transition">Catalogue</Link>
            <a
              href={lienSav}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-white/70 hover:text-[#C9992C] transition"
            >
              🔧 Service après-vente
            </a>
          </div>
        </nav>

        {/* ── Menu mobile ── */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#1A1A1A] px-4 py-3 max-h-[75vh] overflow-y-auto">
            <div className="space-y-1">
              <MobileLink to="/" onClick={() => setMenuOpen(false)}>Accueil</MobileLink>
              <MobileLink to="/catalogue" onClick={() => setMenuOpen(false)}>Catalogue</MobileLink>
            </div>

            <p className="text-white/40 text-[10px] uppercase tracking-widest mt-4 mb-1">Catégories</p>
            <div className="space-y-1">
              {CATEGORIES.map(cat => (
                <MobileLink
                  key={cat.name}
                  to={`/catalogue?cat=${encodeURIComponent(cat.name)}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="mr-2">{cat.icon}</span>
                  {cat.name}
                </MobileLink>
              ))}
            </div>

            <div className="border-t border-white/10 mt-4 pt-3 space-y-2">
              <a href="tel:+212661306732" className="block text-white/80 py-1 text-sm">📞 {TEL}</a>
              <a
                href={`https://wa.me/${WA}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-400 py-1 text-sm"
              >
                <WhatsAppIcon /> Commander via WhatsApp
              </a>
              <a
                href={lienSav}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/80 py-1 text-sm"
              >
                🔧 Service après-vente
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

function MobileLink({
  to,
  onClick,
  children,
}: {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link to={to} onClick={onClick} className="block text-white/80 hover:text-[#C9992C] py-1.5 text-sm">
      {children}
    </Link>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}