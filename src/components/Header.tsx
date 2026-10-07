import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/catalogue?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#1A1A1A] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo mark + wordmark */}
        <Link to="/" className="flex-shrink-0 flex items-center gap-2.5">
          <MHLogo />
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

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 flex">
          <div className="relative w-full flex">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Rechercher un appareil, une marque..."
              className="w-full pl-4 pr-3 py-2 rounded-l-lg bg-white/10 border border-white/15 text-white placeholder-white/40 text-sm outline-none focus:bg-white/15 transition"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#C9992C] text-[#1A1A1A] font-semibold text-sm rounded-r-lg hover:bg-[#D9A941] transition"
            >
              Rechercher
            </button>
          </div>
        </form>

        {/* WhatsApp CTA */}
        <a
          href="https://wa.me/212661306732"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-lg text-sm font-medium transition"
        >
          <WhatsAppIcon />
          <span>Commander</span>
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Nav */}
      <nav className="hidden md:block border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex gap-6 text-sm text-white/70 py-2">
          <Link to="/" className="hover:text-[#C9992C] transition">Accueil</Link>
          <Link to="/catalogue" className="hover:text-[#C9992C] transition">Catalogue</Link>
          <Link to="/catalogue?cat=Réfrigérateurs" className="hover:text-[#C9992C] transition">Réfrigérateurs</Link>
          <Link to="/catalogue?cat=Machines+à+laver" className="hover:text-[#C9992C] transition">Machines à laver</Link>
          <Link to="/catalogue?cat=Téléviseurs" className="hover:text-[#C9992C] transition">Téléviseurs</Link>
          <Link to="/catalogue?cat=Climatisation" className="hover:text-[#C9992C] transition">Climatisation</Link>
          <Link to="/catalogue?cat=Cuisson" className="hover:text-[#C9992C] transition">Cuisson</Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#1A1A1A] px-4 py-3 space-y-2">
          {[['/', 'Accueil'], ['/catalogue', 'Catalogue']].map(([path, label]) => (
            <Link
              key={path}
              to={path}
              className="block text-white/80 hover:text-[#C9992C] py-1 text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <a
            href="https://wa.me/212661306732"
            className="flex items-center gap-2 text-green-400 py-1 text-sm"
          >
            <WhatsAppIcon /> Commander via WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

function MHLogo() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Black circle */}
      <circle cx="21" cy="21" r="21" fill="#1A1A1A" />
      {/* Mustard outer ring accent */}
      <circle cx="21" cy="21" r="20" stroke="#C9992C" strokeWidth="1.5" fill="none" />
      {/* House roof */}
      <path d="M21 8L33 18H9L21 8Z" fill="#C9992C" />
      {/* House body */}
      <rect x="11" y="17" width="20" height="14" rx="0.5" fill="#1A1A1A" stroke="#C9992C" strokeWidth="1" />
      {/* M letterform */}
      <text x="13" y="28" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="9" fill="white" letterSpacing="-0.5">M</text>
      {/* H letterform */}
      <text x="22.5" y="28" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="9" fill="#C9992C" letterSpacing="-0.5">H</text>
      {/* Door bottom */}
      <rect x="18" y="25" width="6" height="6" rx="0.5" fill="#C9992C" opacity="0.3" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
