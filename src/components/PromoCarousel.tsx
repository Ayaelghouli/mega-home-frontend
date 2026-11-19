import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// ──────────────────────────────────────────────────────────────
// Carrousel des promos. Jusqu'à la date BLACK_FRIDAY_FIN : thème
// BLACK FRIDAY + compte à rebours. Après cette date, la bannière
// repasse toute seule en « OFFRE SPÉCIALE » (rien à changer).
// ──────────────────────────────────────────────────────────────

// Fin de l'opération (heure du Maroc, UTC+1). Change la date ici si besoin.
const BLACK_FRIDAY_FIN = new Date('2026-11-27T23:59:59+01:00').getTime();

export interface PromoArticle {
  id: string | number;
  name: string;
  brand?: string;
  image?: string;
  prix: number;
  ancienPrix?: number; // prix barré (facultatif)
}

const WA = '212661306732';
const DELAI_MS = 4500;
const SEUIL_SWIPE_PX = 50;
const FONT_AR = "'Cairo', 'Segoe UI', Tahoma, sans-serif";

const dh = (n: number) => `${n.toLocaleString('de-DE')} DH`;
const deux = (n: number) => String(n).padStart(2, '0');

function useMaintenant() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);
  return now;
}

function CompteARebours({ reste }: { reste: number }) {
  const s = Math.max(0, Math.floor(reste / 1000));
  const blocs = [
    { v: Math.floor(s / 86400), l: 'jours' },
    { v: Math.floor((s % 86400) / 3600), l: 'heures' },
    { v: Math.floor((s % 3600) / 60), l: 'min' },
    { v: s % 60, l: 'sec' },
  ];
  return (
    <div className="flex items-center gap-2" role="timer" aria-label="Temps restant">
      {blocs.map(b => (
        <div key={b.l} className="min-w-[56px] rounded-lg border border-white/15 bg-black/60 px-2 py-1.5 text-center">
          <div className="text-2xl font-extrabold tabular-nums leading-none text-white md:text-3xl">{deux(b.v)}</div>
          <div className="mt-1 text-[10px] uppercase tracking-wider text-white/60">{b.l}</div>
        </div>
      ))}
    </div>
  );
}

export default function PromoCarousel({ articles }: { articles: PromoArticle[] }) {
  const total = articles.length;
  const [index, setIndex] = useState(0);
  const [enPause, setEnPause] = useState(false);
  const departX = useRef<number | null>(null);
  const now = useMaintenant();
  const reste = BLACK_FRIDAY_FIN - now;
  const blackFriday = reste > 0;

  const aller = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);

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
    <div>
      {/* Grande bannière : français + arabe (+ compte à rebours en période Black Friday) */}
      {blackFriday ? (
        <div className="mb-4 overflow-hidden rounded-2xl border border-red-600/50 bg-gradient-to-r from-black via-[#2a0b0b] to-black px-6 py-5 text-white shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <div>
              <h2
                className="text-4xl font-extrabold uppercase leading-none tracking-wide md:text-6xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Black <span className="text-red-600">Friday</span>
              </h2>
              <p className="mt-2 text-sm text-white/70 md:text-base">
                Prix cassés jusqu'au <strong className="text-[#E0B04A]">27 novembre</strong> — stock limité
              </p>
            </div>
            <span
              lang="ar"
              dir="rtl"
              className="text-4xl font-black leading-none text-[#E0B04A] md:text-6xl"
              style={{ fontFamily: FONT_AR }}
            >
              الجمعة السوداء
            </span>
            <CompteARebours reste={reste} />
          </div>
        </div>
      ) : (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 rounded-2xl bg-gradient-to-r from-[#C9992C] via-[#E0B04A] to-[#C9992C] px-6 py-4 text-[#1A1A1A] shadow-lg">
          <div className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl" aria-hidden>🔥</span>
            <h2
              className="text-3xl font-extrabold uppercase leading-none tracking-wide md:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Offre spéciale
            </h2>
          </div>
          <span lang="ar" dir="rtl" className="text-3xl font-black leading-none md:text-5xl" style={{ fontFamily: FONT_AR }}>
            عرض خاص
          </span>
        </div>
      )}

      <section
        aria-roledescription="carrousel"
        aria-label={blackFriday ? 'Black Friday' : 'Offres spéciales'}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#2E2E2E] select-none"
        onMouseEnter={() => setEnPause(true)}
        onMouseLeave={() => setEnPause(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-700 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {articles.map((a, i) => {
            const msg = encodeURIComponent(
              `Bonjour, je suis intéressé par : ${a.name} (${dh(a.prix)})${blackFriday ? ' — Black Friday' : ''}`,
            );
            const remise =
              a.ancienPrix && a.ancienPrix > a.prix
                ? Math.round(((a.ancienPrix - a.prix) / a.ancienPrix) * 100)
                : null;
            return (
              <div
                key={a.id}
                aria-hidden={i !== index}
                className="relative grid w-full shrink-0 grid-cols-1 md:h-[400px] md:grid-cols-2"
              >
                {/* Photo du produit */}
                <Link
                  to={`/produit/${a.id}`}
                  tabIndex={i === index ? 0 : -1}
                  draggable={false}
                  className="relative flex h-[240px] items-center justify-center bg-gradient-to-br from-[#f4f2ed] to-[#e5e3de] md:h-full"
                >
                  <span
                    className={`absolute left-4 top-4 rounded px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                      blackFriday ? 'bg-red-600 text-white' : 'bg-[#C9992C] text-[#1A1A1A]'
                    }`}
                  >
                    {blackFriday ? 'Black Friday' : 'Promo'}
                    {remise ? ` −${remise}%` : ''}
                  </span>
                  <img
                    src={a.image || '/placeholder-produit.png'}
                    alt={a.name}
                    draggable={false}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    onError={e => {
                      const img = e.currentTarget;
                      if (!img.src.endsWith('/placeholder-produit.png')) img.src = '/placeholder-produit.png';
                    }}
                    className="h-full max-h-[320px] w-auto max-w-[85%] object-contain p-4"
                  />
                </Link>

                {/* Texte */}
                <div className="flex flex-col justify-center gap-3 p-6 pb-14 md:p-10">
                  <span className={`h-1 w-12 rounded ${blackFriday ? 'bg-red-600' : 'bg-[#C9992C]'}`} />
                  {a.brand && (
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9992C]">{a.brand}</span>
                  )}
                  <h3
                    className="text-2xl leading-tight text-white md:text-3xl"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {a.name}
                  </h3>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-3xl font-bold text-white">{dh(a.prix)}</span>
                    {a.ancienPrix && a.ancienPrix > a.prix && (
                      <span className="text-lg text-white/50 line-through">{dh(a.ancienPrix)}</span>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-3">
                    <a
                      href={`https://wa.me/${WA}?text=${msg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={i === index ? 0 : -1}
                      className="rounded-lg bg-[#C9992C] px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] transition hover:bg-[#D9A941]"
                    >
                      Je veux ça
                    </a>
                    <Link
                      to={`/produit/${a.id}`}
                      tabIndex={i === index ? 0 : -1}
                      className="rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#C9992C] hover:text-[#C9992C]"
                    >
                      Voir le produit →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              aria-label="Promo précédente"
              onClick={() => aller(index - 1)}
              className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl text-white backdrop-blur transition hover:bg-[#C9992C] sm:flex"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Promo suivante"
              onClick={() => aller(index + 1)}
              className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl text-white backdrop-blur transition hover:bg-[#C9992C] sm:flex"
            >
              ›
            </button>
            <div className="absolute bottom-4 left-0 right-0 flex flex-wrap justify-center gap-2 px-4">
              {articles.map((a, i) => (
                <button
                  key={a.id}
                  type="button"
                  aria-label={`Aller à la promo ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => aller(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'w-8 bg-[#C9992C]' : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}