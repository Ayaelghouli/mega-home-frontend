import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchProduit, fetchProduits } from '../lib/api';
import type { Product } from '../data/products';
import ProductCard from '../components/ProductCard';
import ImageZoom from '../components/ImageZoom';
 import AddToListButton from '../components/AddToListButton';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [related, setRelated] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!id) return;
    setProduct(undefined);
    setActiveImage(0);
    fetchProduit(id).then(setProduct).catch(() => setProduct(null));
  }, [id]);

  useEffect(() => {
    if (!product) return;
    fetchProduits({ categorie: product.category, limite: 5 })
      .then(produits => setRelated(produits.filter(p => p.id !== product.id).slice(0, 4)))
      .catch(() => {});
  }, [product]);

  if (product === undefined) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-[#1A1A1A]/40 font-medium">Chargement...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">😕</p>
          <p className="text-[#1A1A1A] font-medium mb-4">Produit introuvable</p>
          <button onClick={() => navigate('/catalogue')} className="text-[#C9992C] underline text-sm">
            Retour au catalogue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#F7F5F0] border-b border-[#E5E3DE] px-4 py-3">
        <div className="max-w-7xl mx-auto text-sm text-[#1A1A1A]/50 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-[#C9992C]">Accueil</Link>
          <span>/</span>
          <Link to="/catalogue" className="hover:text-[#C9992C]">Catalogue</Link>
          <span>/</span>
          <Link to={`/catalogue?cat=${encodeURIComponent(product.category)}`} className="hover:text-[#C9992C]">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* ── Gallery ── */}
          <div>
            <ImageZoom src={product.images[activeImage]} alt={product.name} />
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${activeImage === i ? 'border-[#C9992C]' : 'border-[#E5E3DE] hover:border-[#C9992C]/50'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain bg-white p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info ── */}
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[10px] bg-[#C9992C]/10 text-[#C9992C] font-semibold uppercase tracking-widest px-2 py-0.5 rounded">
                {product.brand}
              </span>
              <span className="text-[10px] text-[#1A1A1A]/40 font-mono">Réf. {product.reference}</span>
              {product.promoLabel && (
                <span className="text-[10px] bg-[#C9992C] text-white font-bold px-2 py-0.5 rounded">
                  {product.promoLabel}
                </span>
              )}
            </div>

            <h1
              className="text-3xl md:text-4xl text-[#1A1A1A] mb-4 leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {product.name}
            </h1>

            <p className="text-[#1A1A1A]/60 leading-relaxed text-sm mb-6">{product.description}</p>

            {/* Price block */}
            <div className="bg-[#F7F5F0] border border-[#E5E3DE] rounded-xl p-5 mb-6">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-4xl font-bold text-[#1A1A1A]">
                  {product.price.toLocaleString('fr-MA')} DH
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    {product.originalPrice.toLocaleString('fr-MA')} DH
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-[#C9992C] font-semibold text-sm">
                  Économie de {(product.originalPrice - product.price).toLocaleString('fr-MA')} DH
                </p>
              )}
            </div>

            {/* CTA */}
            <a
              href={`https://wa.me/212661306732?text=${encodeURIComponent(`Bonjour, je voudrais commander : ${product.name} (Réf. ${product.reference}) au prix de ${product.price.toLocaleString('fr-MA')} DH.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-[#C9992C] hover:bg-[#B8872A] text-white font-bold py-4 rounded-xl transition text-base"
            >
              <WhatsAppIcon />
              Commander via WhatsApp
            </a>
            <div className="mt-3"><AddToListButton product={product} variante="detail" /></div>

            <div className="mt-4 flex gap-3 text-xs text-[#1A1A1A]/40 justify-center">
              <span>🚚 Livraison Rabat · Salé · Kénitra</span>
              <span>•</span>
              <span>✅ Garantie</span>
              <span>•</span>
              <span>🔧 Installation</span>
            </div>
          </div>
        </div>

        {/* ── Specifications ── */}
        {product.specs.length > 0 && (
        <section className="mb-16">
          <h2
            className="text-2xl text-[#1A1A1A] mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Caractéristiques techniques
          </h2>
          <div className="bg-white border border-[#E5E3DE] rounded-xl overflow-hidden">
            {product.specs.map((spec, i) => (
              <div
                key={spec.label}
                className={`flex items-center px-6 py-3 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F7F5F0]'}`}
              >
                <span className="w-40 text-sm font-semibold text-[#1A1A1A]/50 flex-shrink-0">{spec.label}</span>
                <span className="text-sm text-[#1A1A1A] font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </section>
        )}

        {/* ── Related products ── */}
        {related.length > 0 && (
          <section>
            <h2
              className="text-2xl text-[#1A1A1A] mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Produits similaires
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}