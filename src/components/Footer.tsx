import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white/80 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MHLogoSmall />
            <span className="text-white font-bold text-base">
              Mega<span className="text-[#C9992C]">Home</span>
            </span>
          </div>
          <div
            className="text-[#C9992C] text-xs italic mb-4"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Votre maison, notre priorité
          </div>
          <p className="text-sm leading-relaxed text-white/50">
            Votre partenaire de confiance pour tous vos appareils électroménagers à Salé et dans toute la région.
          </p>
        </div>

        {/* Catégories */}
        <div>
          <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-widest">Catégories</h4>
          <ul className="space-y-2 text-sm">
            {['Réfrigérateurs', 'Machines à laver', 'Téléviseurs', 'Climatisation', 'Cuisson'].map(cat => (
              <li key={cat}>
                <Link to={`/catalogue?cat=${encodeURIComponent(cat)}`} className="hover:text-[#C9992C] transition">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-widest">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <span>📍</span>
              <span className="text-white/50">Res Touahri 11 magasin N°2 AV MED 5 Tabriquet Salé</span>
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span>
              <a href="tel:+212661306732" className="hover:text-[#C9992C] transition">+212 6 61 30 67 32</a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">📱</span>
              <a href="https://wa.me/212661306732" className="hover:text-[#C9992C] transition text-green-400">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* Horaires */}
        <div>
          <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-widest">Horaires</h4>
          <ul className="space-y-2 text-sm text-white/50">
            <li className="flex justify-between"><span>Lundi – Samdi</span><span>09h00 – 21h00</span></li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C9992C] hover:text-[#1A1A1A] transition text-xs font-bold">f</a>
            <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C9992C] hover:text-[#1A1A1A] transition text-xs font-bold">in</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 border-t border-white/10 pt-6 text-center text-xs text-white/30">
        © {new Date().getFullYear()} Mega Home Equipement — Salé, Maroc. Tous droits réservés.
      </div>
    </footer>
  );
}

function MHLogoSmall() {
  return (
    <svg width="32" height="32" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="21" cy="21" r="21" fill="#1A1A1A" />
      <circle cx="21" cy="21" r="20" stroke="#C9992C" strokeWidth="1.5" fill="none" />
      <path d="M21 8L33 18H9L21 8Z" fill="#C9992C" />
      <rect x="11" y="17" width="20" height="14" rx="0.5" fill="#1A1A1A" stroke="#C9992C" strokeWidth="1" />
      <text x="13" y="28" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="9" fill="white" letterSpacing="-0.5">M</text>
      <text x="22.5" y="28" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="9" fill="#C9992C" letterSpacing="-0.5">H</text>
    </svg>
  );
}
