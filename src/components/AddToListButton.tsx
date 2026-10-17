import type { MouseEvent } from 'react';
import type { Product } from '../data/products';
import { useListe } from '../context/ListeContext';

interface Props {
  product: Product;
  /** "carte" = petit bouton pour ProductCard, "detail" = grand bouton fiche produit */
  variante?: 'carte' | 'detail';
}

export default function AddToListButton({ product, variante = 'carte' }: Props) {
  const { ajouter, contient, setOuvert } = useListe();
  const dedans = contient(String(product.id));

  function onClick(e: MouseEvent) {
    // La carte produit est un lien : on empêche la navigation
    e.preventDefault();
    e.stopPropagation();
    ajouter(product);
    setOuvert(true);
  }

  const base =
    variante === 'detail'
      ? 'w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-base border-2 transition'
      : 'w-full flex items-center justify-center gap-1.5 py-2 rounded-lg font-semibold text-xs border transition';

  const style = dedans
    ? 'border-[#C9992C] bg-[#C9992C]/10 text-[#C9992C]'
    : 'border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white';

  return (
    <button type="button" onClick={onClick} className={`${base} ${style}`}>
      {dedans ? '✓ Dans ma liste (+1)' : '＋ Ajouter à ma liste'}
    </button>
  );
}