import { useEffect } from 'react';

const NOM_SITE = 'Mega Home Equipement';

/**
 * Met à jour le <title> et la meta description de la page courante.
 * Usage dans une page :  usePageMeta('Catalogue', 'Électroménager à Salé…');
 */
export function usePageMeta(titre?: string, description?: string) {
  useEffect(() => {
    document.title = titre ? `${titre} | ${NOM_SITE}` : `${NOM_SITE} – Électroménager à Salé`;

    if (description) {
      let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = description;
    }
  }, [titre, description]);
}