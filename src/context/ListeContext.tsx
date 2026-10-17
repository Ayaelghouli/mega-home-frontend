import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../data/products';

export interface LigneListe {
  id: string;
  name: string;
  reference: string;
  price: number;
  image?: string;
  qty: number;
}

interface ListeCtx {
  lignes: LigneListe[];
  count: number; // nombre total d'articles (quantités cumulées)
  total: number;
  ouvert: boolean;
  setOuvert: (v: boolean) => void;
  contient: (id: string) => boolean;
  ajouter: (p: Product) => void;
  changerQty: (id: string, delta: number) => void;
  retirer: (id: string) => void;
  vider: () => void;
}

const CLE = 'megahome_liste';
const Ctx = createContext<ListeCtx | null>(null);

function charger(): LigneListe[] {
  try {
    const brut = localStorage.getItem(CLE);
    const data = brut ? JSON.parse(brut) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function ListeProvider({ children }: { children: ReactNode }) {
  const [lignes, setLignes] = useState<LigneListe[]>(charger);
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CLE, JSON.stringify(lignes));
    } catch {
      /* stockage indisponible : la liste reste en mémoire */
    }
  }, [lignes]);

  const valeur = useMemo<ListeCtx>(
    () => ({
      lignes,
      count: lignes.reduce((n, l) => n + l.qty, 0),
      total: lignes.reduce((s, l) => s + l.price * l.qty, 0),
      ouvert,
      setOuvert,
      contient: id => lignes.some(l => l.id === id),
      ajouter: p => {
        const id = String(p.id);
        setLignes(prev =>
          prev.some(l => l.id === id)
            ? prev.map(l => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
            : [
                ...prev,
                {
                  id,
                  name: p.name,
                  reference: p.reference,
                  price: p.price,
                  image: p.images?.[0],
                  qty: 1,
                },
              ],
        );
      },
      changerQty: (id, delta) =>
        setLignes(prev =>
          prev
            .map(l => (l.id === id ? { ...l, qty: l.qty + delta } : l))
            .filter(l => l.qty > 0),
        ),
      retirer: id => setLignes(prev => prev.filter(l => l.id !== id)),
      vider: () => setLignes([]),
    }),
    [lignes, ouvert],
  );

  return <Ctx.Provider value={valeur}>{children}</Ctx.Provider>;
}

export function useListe(): ListeCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useListe doit être utilisé dans <ListeProvider>');
  return ctx;
}