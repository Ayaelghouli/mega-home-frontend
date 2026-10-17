import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTypewriter } from '../hooks/useTypewriter';
import { CATEGORIES, type Product } from '../data/products';
import { fetchProduits } from '../lib/api';
import ProductCard from '../components/ProductCard';
import CategoryCarousel from '../components/CategoryCarousel';


const PARTNER_BRANDS = [
  { name: 'Samsung', svg: <SamsungLogo /> },
  { name: 'LG', svg: <LGLogo /> },
  { name: 'TCL', svg: <TCLLogo /> },
  { name: 'Bosch', svg: <BoschLogo /> },
  { name: 'Beko', svg: <BekoLogo /> },
  { name: 'Whirlpool', svg: <WhirlpoolLogo /> },
  { name: 'Candy', svg: <CandyLogo /> },
  { name: 'Ariston', svg: <AristonLogo /> },
];

export default function HomePage() {
  const { displayed, done } = useTypewriter("Équipez votre maison avec confiance.", 55, 400);

  const [promoProducts, setPromoProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProduits({ promo: true, limite: 4 })
      .then(setPromoProducts)
      .catch(() => {});
    fetchProduits({ limite: 8 })
      .then(setFeaturedProducts)
      .catch(() => {});
  }, []);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#1A1A1A] text-white">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />
        {/* Mustard side accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C9992C]" />

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            {/* Tagline */}
            <div
              className="text-[#C9992C] text-xl md:text-2xl italic mb-4 leading-tight"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Votre maison, notre priorité
            </div>

            <div className="inline-flex items-center gap-2 bg-[#C9992C]/20 border border-[#C9992C]/30 rounded-full px-4 py-1.5 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#C9992C] animate-pulse" />
              <span className="text-[#C9992C] text-xs font-semibold uppercase tracking-wider">
                Nouveau catalogue disponible
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-3 min-h-[1.2em]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {displayed}
              <span
                className={`inline-block w-0.5 h-[0.85em] bg-[#C9992C] ml-1 align-middle cursor-blink`}
              />
            </h1>

            <p className="text-white/60 text-lg max-w-md mb-8 leading-relaxed">
              Réfrigérateurs, téléviseurs, machines à laver et plus encore — tout ce dont votre foyer a besoin, aux meilleurs prix à Salé.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/catalogue"
                className="px-6 py-3 bg-[#C9992C] hover:bg-[#B8872A] text-white font-semibold rounded-lg transition text-sm"
              >
                Voir le catalogue →
              </Link>
              <a
                href="https://wa.me/212661306732"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium rounded-lg transition text-sm flex items-center gap-2"
              >
                <span className="text-green-400">●</span> WhatsApp
              </a>
            </div>
          </div>

          {/* Carrousel des catégories */}
          <CategoryCarousel />
        </div>
      </section>

      {/* ── Partner brands band ── */}
      <section className="bg-white border-b border-[#E5E3DE] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/40 mb-6">
            Nos marques partenaires
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {PARTNER_BRANDS.map(brand => (
              <div
                key={brand.name}
                className="flex items-center justify-center opacity-40 hover:opacity-80 transition-opacity grayscale hover:grayscale-0"
                title={brand.name}
              >
                {brand.svg}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="bg-[#F7F5F0] border-b border-[#E5E3DE]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {[
            { icon: '🚚', text: 'Livraison Rabat · Salé · Kénitra' },
            { icon: '🔧', text: 'Installation professionnelle' },
            { icon: '✅', text: 'Garantie' },
            { icon: '💬', text: 'Commander via WhatsApp' },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-2 text-sm text-[#1A1A1A]">
              <span>{item.icon}</span>
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Promotions "En ce moment" ── */}
      <section className="bg-[#1A1A1A] py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#C9992C] text-xs font-bold uppercase tracking-widest mb-1">Offres spéciales</p>
              <h2
                className="text-3xl text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                En ce moment
              </h2>
            </div>
            <Link
              to="/catalogue?promo=true"
              className="text-sm text-white/60 hover:text-[#C9992C] transition underline underline-offset-4"
            >
              Voir toutes les promos
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {promoProducts.map(product => (
              <div key={product.id} className="bg-[#2E2E2E] rounded-xl border border-white/5 overflow-hidden group hover:bg-[#383838] transition">
                <Link to={`/produit/${product.id}`} className="block relative overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-44 object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-[#C9992C] text-white text-xs font-bold px-2 py-0.5 rounded">
                    {product.promoLabel}
                  </span>
                </Link>
                <div className="p-4">
                  <p className="text-[10px] text-[#C9992C] uppercase tracking-widest font-semibold">{product.brand}</p>
                  <Link to={`/produit/${product.id}`} className="text-white font-medium text-sm leading-snug hover:text-[#C9992C] transition line-clamp-2 mt-1 block">
                    {product.name}
                  </Link>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold">{product.price.toLocaleString('fr-MA')} DH</span>
                      {product.originalPrice && (
                        <span className="text-white/30 text-xs line-through ml-2">
                          {product.originalPrice.toLocaleString('fr-MA')} DH
                        </span>
                      )}
                    </div>
                    <a
                      href={`https://wa.me/212661306732?text=${encodeURIComponent('Promo : ' + product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-[#C9992C] hover:bg-[#B8872A] text-white font-bold px-3 py-1.5 rounded-lg transition"
                    >
                      Je veux ça
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category grid ── */}
      <section className="py-16 bg-[#F7F5F0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10 text-center">
            <p className="text-[#C9992C] text-xs font-bold uppercase tracking-widest mb-2">Nos catégories</p>
            <h2
              className="text-3xl text-[#1A1A1A]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Tout ce qu'il faut pour votre maison
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.name}
                to={`/catalogue?cat=${encodeURIComponent(cat.name)}`}
                className="group rounded-xl overflow-hidden border border-[#E5E3DE] bg-white hover:border-[#C9992C] transition-all hover:shadow-sm"
              >
                <div className="relative h-32 bg-gray-50 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-3xl">{cat.icon}</span>
                </div>
                <div className="px-3 py-3 text-center">
                  <span className="text-[#1A1A1A] text-xs font-semibold group-hover:text-[#C9992C] transition leading-tight block">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured products ── */}
      <section className="py-16 bg-white border-t border-[#E5E3DE]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#C9992C] text-xs font-bold uppercase tracking-widest mb-1">Sélection</p>
              <h2
                className="text-3xl text-[#1A1A1A]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Produits populaires
              </h2>
            </div>
            <Link
              to="/catalogue"
              className="text-sm text-[#1A1A1A] hover:text-[#C9992C] transition underline underline-offset-4 font-medium"
            >
              Voir tout →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WhatsApp CTA Banner ── */}
      <section className="bg-[#C9992C] py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-2xl md:text-3xl text-white mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Besoin de conseil ou d'un devis ?
          </h2>
          <p className="text-white/70 mb-6 text-sm">
            Notre équipe vous répond rapidement sur WhatsApp — 7j/7.
          </p>
          <a
            href={`https://wa.me/212661306732?text=${encodeURIComponent('Bonjour, je souhaite des informations sur vos produits.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 bg-[#1A1A1A] hover:bg-[#2E2E2E] text-white font-semibold rounded-lg transition text-sm"
          >
            <span className="text-green-400">●</span>
            Contacter sur WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}

/* ── Partner brand SVG logos (simplified wordmarks, grayscale-friendly) ── */

function SamsungLogo() {
  return (
    <svg width="90" height="24" viewBox="0 0 90 24" fill="none">
      <text x="0" y="19" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" fill="#1A1A1A" letterSpacing="1">SAMSUNG</text>
    </svg>
  );
}

function LGLogo() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="21" stroke="#1A1A1A" strokeWidth="2" fill="none" />
      <text x="8" y="29" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" fill="#1A1A1A">LG</text>
    </svg>
  );
}

function TCLLogo() {
  return (
    <svg width="56" height="24" viewBox="0 0 56 24" fill="none">
      <text x="0" y="19" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="20" fill="#1A1A1A" letterSpacing="2">TCL</text>
    </svg>
  );
}

function BoschLogo() {
  return (
    <svg width="72" height="24" viewBox="0 0 72 24" fill="none">
      <text x="0" y="19" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" fill="#1A1A1A" letterSpacing="0.5">BOSCH</text>
    </svg>
  );
}

function BekoLogo() {
  return (
    <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
      <text x="0" y="19" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" fill="#1A1A1A" letterSpacing="0.5">beko</text>
    </svg>
  );
}

function WhirlpoolLogo() {
  return (
    <svg width="96" height="24" viewBox="0 0 96 24" fill="none">
      <text x="0" y="18" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="14" fill="#1A1A1A" letterSpacing="0.3">Whirlpool</text>
    </svg>
  );
}

function CandyLogo() {
  return (
    <svg width="64" height="24" viewBox="0 0 64 24" fill="none">
      <text x="0" y="19" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" fill="#1A1A1A" letterSpacing="0.5">Candy</text>
    </svg>
  );
}

function AristonLogo() {
  return (
    <svg width="76" height="24" viewBox="0 0 76 24" fill="none">
      <text x="0" y="19" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="16" fill="#1A1A1A" letterSpacing="0.5">Ariston</text>
    </svg>
  );
}