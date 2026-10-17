import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/products';

// ──────────────────────────────────────────────────────────────
// Carrousel des catégories (colonne de droite du hero).
// Lit directement CATEGORIES (data/products.ts) : si tu ajoutes une
// catégorie là-bas, elle apparaît ici automatiquement.
// Une catégorie à la fois, défilement auto, flèches, points,
// glissement au doigt sur mobile, pause au survol.
// ──────────────────────────────────────────────────────────────

// Petite phrase sous le titre (facultatif : sans entrée, on affiche "Découvrir la sélection")
const SOUS_TITRES: Record<string, string> = {
  'Réfrigérateurs': 'Combinés, No Frost, Side by Side',
  'Congélateurs': 'Coffres et armoires',
  'Machines à laver': 'Frontales, top, séchantes',
  'Lave-vaisselle': 'Encastrables et pose libre',
  'Téléviseurs': 'LED, QLED, OLED, Smart TV',
  'Audio': 'Barres de son, enceintes, home cinéma',
  'Climatisation': 'Split, inverter, gainables',
  'Cuisson': 'Fours, plaques, cuisinières',
  'Hottes': 'Murales, îlots, encastrables',
  'Chauffe-eau / Solaire': 'Électriques, solaires, gaz',
  'Petit électroménager': 'Cafetières, mixeurs, fers',
  'Ustensiles de cuisine': 'Poêles, casseroles, accessoires',
};

const DELAI_MS = 4500;
const SEUIL_SWIPE_PX = 50;

export default function CategoryCarousel() {
  const slides = CATEGORIES;
  const total = slides.length;

  const [index, setIndex] = useState(0);
  const [enPause, setEnPause] = useState(false);
  const [imagesCassees, setImagesCassees] = useState<Record<number, boolean>>({});
  const departX = useRef<number | null>(null);

  const aller = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);

  // Défilement automatique (désactivé si l'utilisateur préfère moins d'animations)
  useEffect(() => {
    const reduit = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (enPause || reduit || total < 2) return;
    const t = window.setInterval(() => setIndex(i => (i + 1) % total), DELAI_MS);
    return () => window.clearInterval(t);
  }, [enPause, total]);

  const onTouchStart = (e: React.TouchEvent) => {
    departX.current = e.touches[0].clientX;
    setEnPause(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (departX.current !== null) {
      const dx = e.changedTouches[0].clientX - departX.current;
      if (Math.abs(dx) > SEUIL_SWIPE_PX) aller(index + (dx < 0 ? 1 : -1));
    }
    departX.current = null;
    setEnPause(false);
  };

  if (total === 0) return null;

  return (
    <section
      aria-roledescription="carrousel"
      aria-label="Nos catégories"
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#2E2E2E] select-none"
      onMouseEnter={() => setEnPause(true)}
      onMouseLeave={() => setEnPause(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Piste : toutes les slides côte à côte, décalée en translateX */}
      <div
        className="flex transition-transform duration-700 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((cat, i) => {
          const afficherImage = cat.image && !imagesCassees[i];
          return (
            <Link
              key={cat.name}
              to={`/catalogue?cat=${encodeURIComponent(cat.name)}`}
              aria-hidden={i !== index}
              tabIndex={i === index ? 0 : -1}
              draggable={false}
              className="relative block h-[300px] w-full shrink-0 md:h-[400px]"
            >
              {/* Fond dégradé (toujours là, visible si l'image manque ou est cassée) */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3a3a3a] via-[#232323] to-[#4a3b14]" />
              {afficherImage && (
                <img
                  src={cat.image}
                  alt=""
                  draggable={false}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  onError={() => setImagesCassees(prev => ({ ...prev, [i]: true }))}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              {/* Voile pour garder le texte lisible */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />

              {/* Grande icône si pas de photo */}
              {!afficherImage && (
                <span className="absolute right-6 top-6 text-6xl opacity-80 md:text-7xl">{cat.icon}</span>
              )}

              <div className="relative flex h-full flex-col justify-end p-6 pb-14">
                <span className="mb-3 h-1 w-12 rounded bg-[#C9992C]" />
                <h3
                  className="text-3xl leading-tight text-white md:text-4xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {cat.name}
                </h3>
                <p className="mt-1 text-sm text-white/75">
                  {SOUS_TITRES[cat.name] ?? 'Découvrir la sélection'}
                </p>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#C9992C]">
                  Découvrir <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Flèches (cachées sur mobile : on glisse au doigt) */}
      <button
        type="button"
        aria-label="Catégorie précédente"
        onClick={() => aller(index - 1)}
        className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl text-white backdrop-blur transition hover:bg-[#C9992C] sm:flex"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Catégorie suivante"
        onClick={() => aller(index + 1)}
        className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl text-white backdrop-blur transition hover:bg-[#C9992C] sm:flex"
      >
        ›
      </button>

      {/* Points de navigation */}
      <div className="absolute bottom-4 left-0 right-0 flex flex-wrap justify-center gap-2 px-4">
        {slides.map((cat, i) => (
          <button
            key={cat.name}
            type="button"
            aria-label={`Aller à ${cat.name}`}
            aria-current={i === index}
            onClick={() => aller(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-[#C9992C]' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}