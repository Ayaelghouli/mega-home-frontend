
import { Link } from 'react-router-dom';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-xl border border-[#E5E3DE] overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <Link
        to={'/produit/' + product.id}
        className="relative flex items-center justify-center h-52 w-full overflow-hidden bg-white p-3"
      >
        <img
          src={product.images?.[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
        />

        {product.promoLabel && (
          <span className="absolute top-2 left-2 bg-[#C9992C] text-white text-xs font-bold px-2 py-0.5 rounded">
            {product.promoLabel}
          </span>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] uppercase tracking-widest text-[#C9992C] font-semibold mb-1">
          {product.brand}
        </p>

        <Link
          to={'/produit/' + product.id}
          className="text-[#1A1A1A] font-medium text-sm leading-snug hover:text-[#C9992C] transition line-clamp-2 mb-3 flex-1"
        >
          {product.name}
        </Link>

        <div className="flex items-end justify-between gap-2 mt-auto">
          <div className="min-w-0">
            <div className="text-[#1A1A1A] font-bold text-lg leading-tight">
              {product.price.toLocaleString('fr-MA')} DH
            </div>

            {product.originalPrice && (
              <div className="text-xs text-gray-400 line-through mt-0.5">
                {product.originalPrice.toLocaleString('fr-MA')} DH
              </div>
            )}
          </div>

          <a
            href={
              'https://wa.me/212661306732?text=' +
              encodeURIComponent(
                'Je suis intéressé par : ' +
                  product.name +
                  ' (Réf. ' +
                  product.reference +
                  ')'
              )
            }
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs bg-[#C9992C] hover:bg-[#B8872A] text-white font-semibold px-3 py-1.5 rounded-lg transition"
          >
            Commander
          </a>
        </div>
      </div>
    </div>
  );
}
