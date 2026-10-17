import { useEffect, useRef, useState } from 'react';
import { useListe } from '../context/ListeContext';
import type { LigneListe } from '../context/ListeContext';

const WA_NUMERO = '212661306732';
const fmt = (n: number) => n.toLocaleString('fr-MA');

const lienWa = (texte: string) => `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(texte)}`;

function messageListe(lignes: LigneListe[], total: number) {
  const corps = lignes
    .map((l, i) => `${i + 1}. ${l.name} (Réf. ${l.reference}) × ${l.qty} — ${fmt(l.price * l.qty)} DH`)
    .join('\n');
  return (
    `Bonjour, je souhaite un devis pour :\n\n${corps}\n\n` +
    `Total estimé : ${fmt(total)} DH\n\n` +
    `Merci de me confirmer la disponibilité, le prix et la livraison.`
  );
}

const echapper = (s: string) =>
  s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));

/** Ouvre un devis imprimable : dans la fenêtre d'impression, choisir « Enregistrer en PDF ». */
function ouvrirDevis(lignes: LigneListe[], total: number) {
  const date = new Date().toLocaleDateString('fr-FR');
  const rows = lignes
    .map(
      l => `<tr>
        <td>${echapper(l.reference)}</td>
        <td>${echapper(l.name)}</td>
        <td class="r">${l.qty}</td>
        <td class="r">${fmt(l.price)}</td>
        <td class="r">${fmt(l.price * l.qty)}</td></tr>`,
    )
    .join('');

  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<title>Devis Mega Home Equipement</title>
<style>
  body{font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;margin:32px;font-size:13px}
  h1{font-size:22px;margin:0 0 4px} .sub{color:#666;margin-bottom:24px}
  table{width:100%;border-collapse:collapse;margin-top:16px}
  th,td{border:1px solid #ddd;padding:8px;text-align:left} th{background:#f7f5f0}
  .r{text-align:right} .tot{font-weight:bold;background:#f7f5f0}
  .note{margin-top:24px;color:#555;font-size:12px;line-height:1.5}
  .top{display:flex;justify-content:space-between;align-items:flex-start}
  @media print{body{margin:16px}}
</style></head><body>
<div class="top">
  <div><h1>Mega Home Equipement</h1>
  <div class="sub">Res Touahri, 11 magasin N°2, Av. Mohammed V, Tabriquet, Salé<br>
  Tél / WhatsApp : +212 6 61 30 67 32</div></div>
  <div><strong>DEVIS</strong><br>Date : ${date}</div>
</div>
<table>
  <thead><tr><th>Réf.</th><th>Désignation</th><th class="r">Qté</th><th class="r">P.U. TTC (DH)</th><th class="r">Total TTC (DH)</th></tr></thead>
  <tbody>${rows}
  <tr class="tot"><td colspan="4" class="r">TOTAL TTC</td><td class="r">${fmt(total)} DH</td></tr></tbody>
</table>
<p class="note">Devis indicatif, valable 7 jours. Les prix et la disponibilité sont confirmés à la commande.
Livraison : Rabat · Salé · Kénitra. Garantie selon produit.</p>
<script>window.onload=function(){window.print()}</script>
</body></html>`;

  const w = window.open('', '_blank');
  if (!w) {
    alert('Autorisez les fenêtres pop-up pour télécharger le devis.');
    return;
  }
  w.document.write(html);
  w.document.close();
}

/* ───────────── Bouton WhatsApp flottant (commande + SAV) ───────────── */
function WhatsAppFlottant() {
  const [ouvert, setOuvert] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ouvert) return;
    const clic = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOuvert(false);
    };
    document.addEventListener('mousedown', clic);
    return () => document.removeEventListener('mousedown', clic);
  }, [ouvert]);

  return (
    <div ref={ref} className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {ouvert && (
        <div className="w-64 bg-white border border-[#E5E3DE] rounded-xl shadow-xl p-2">
          <a
            href={lienWa('Bonjour, je souhaite des renseignements sur vos produits.')}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-3 rounded-lg hover:bg-[#F7F5F0] transition"
          >
            <span className="block text-sm font-semibold text-[#1A1A1A]">🛒 Commander / Renseignements</span>
            <span className="block text-xs text-[#1A1A1A]/50">Prix, disponibilité, livraison</span>
          </a>
          <a
            href={lienWa(
              'Bonjour, j’ai besoin du service après-vente.\nProduit concerné : \nN° de facture : \nProblème rencontré : ',
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-3 rounded-lg hover:bg-[#F7F5F0] transition"
          >
            <span className="block text-sm font-semibold text-[#1A1A1A]">🔧 Service après-vente</span>
            <span className="block text-xs text-[#1A1A1A]/50">Panne, garantie, installation</span>
          </a>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOuvert(o => !o)}
        aria-label="Contacter Mega Home sur WhatsApp"
        aria-expanded={ouvert}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] text-white shadow-lg flex items-center justify-center transition"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </button>
    </div>
  );
}

/* ───────────── Bouton « Ma liste » flottant ───────────── */
function BoutonListe() {
  const { count, setOuvert } = useListe();
  if (count === 0) return null;
  return (
    <button
      type="button"
      onClick={() => setOuvert(true)}
      className="fixed bottom-5 left-5 z-40 flex items-center gap-2 bg-[#1A1A1A] hover:bg-black text-white font-semibold text-sm pl-4 pr-5 py-3 rounded-full shadow-lg transition"
    >
      <span className="bg-[#C9992C] text-[#1A1A1A] font-bold text-xs rounded-full min-w-6 h-6 px-1.5 flex items-center justify-center">
        {count}
      </span>
      Ma liste
    </button>
  );
}

/* ───────────── Panneau « Ma liste » ───────────── */
function PanneauListe() {
  const { lignes, total, count, ouvert, setOuvert, changerQty, retirer, vider } = useListe();

  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === 'Escape' && setOuvert(false);
    document.addEventListener('keydown', touche);
    return () => document.removeEventListener('keydown', touche);
  }, [ouvert, setOuvert]);

  if (!ouvert) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={() => setOuvert(false)} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E3DE]">
          <h2 className="text-lg font-bold text-[#1A1A1A]">
            Ma liste <span className="text-[#1A1A1A]/40 font-normal text-sm">({count})</span>
          </h2>
          <button
            type="button"
            onClick={() => setOuvert(false)}
            aria-label="Fermer"
            className="w-9 h-9 rounded-full hover:bg-[#F7F5F0] text-xl leading-none"
          >
            ×
          </button>
        </div>

        {lignes.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 text-[#1A1A1A]/50">
            <p className="text-4xl mb-3">🛒</p>
            <p className="text-sm">
              Votre liste est vide. Cliquez sur « Ajouter à ma liste » sur les produits qui vous intéressent.
            </p>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-[#E5E3DE]">
              {lignes.map(l => (
                <li key={l.id} className="flex gap-3 p-4">
                  <div className="w-16 h-16 flex-shrink-0 rounded-lg border border-[#E5E3DE] bg-white p-1">
                    {l.image && <img src={l.image} alt="" className="w-full h-full object-contain" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1A1A1A] leading-snug line-clamp-2">{l.name}</p>
                    <p className="text-[11px] text-[#1A1A1A]/40 font-mono mb-2">Réf. {l.reference}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-[#E5E3DE] rounded-lg">
                        <button type="button" onClick={() => changerQty(l.id, -1)} className="w-8 h-8 text-lg" aria-label="Moins">−</button>
                        <span className="w-8 text-center text-sm font-semibold">{l.qty}</span>
                        <button type="button" onClick={() => changerQty(l.id, 1)} className="w-8 h-8 text-lg" aria-label="Plus">+</button>
                      </div>
                      <span className="text-sm font-bold text-[#1A1A1A]">{fmt(l.price * l.qty)} DH</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => retirer(l.id)}
                    aria-label="Retirer"
                    className="self-start text-[#1A1A1A]/30 hover:text-red-500 text-lg leading-none"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>

            <div className="border-t border-[#E5E3DE] p-5 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-[#1A1A1A]/60">Total estimé</span>
                <span className="text-2xl font-bold text-[#1A1A1A]">{fmt(total)} DH</span>
              </div>
              <a
                href={lienWa(messageListe(lignes, total))}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#C9992C] hover:bg-[#B8872A] text-white font-bold py-3.5 rounded-xl transition"
              >
                Envoyer ma liste sur WhatsApp
              </a>
              <button
                type="button"
                onClick={() => ouvrirDevis(lignes, total)}
                className="w-full py-3 rounded-xl border-2 border-[#1A1A1A] text-[#1A1A1A] font-semibold text-sm hover:bg-[#1A1A1A] hover:text-white transition"
              >
                Télécharger le devis (PDF)
              </button>
              <div className="flex items-center justify-between text-xs text-[#1A1A1A]/40">
                <span>Prix indicatifs, confirmés par WhatsApp.</span>
                <button type="button" onClick={vider} className="underline hover:text-red-500">
                  Vider la liste
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

/** À placer UNE seule fois dans App.tsx, à l'intérieur de <ListeProvider>. */
export default function ListeWidgets() {
  return (
    <>
      <WhatsAppFlottant />
      <BoutonListe />
      <PanneauListe />
    </>
  );
}