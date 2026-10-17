import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { usePageMeta } from '../lib/seo';

/* ───────────────────────────────────────────────────────────────
   ⚠ À REMPLIR UNE SEULE FOIS : tout le reste des pages se met à jour.
   Remplace chaque valeur « À COMPLÉTER » par la vraie information
   (elle figure sur ton registre de commerce / attestation ICE).
   ─────────────────────────────────────────────────────────────── */
const INFOS = {
  nomCommercial: 'Mega Home Equipement',
  raisonSociale: 'MEGA HOME EQUIPMENT SARL',
  formeJuridique: 'SARL',
  adresse: 'Res Touahri, 11 magasin N°2, Av. Mohammed V, Tabriquet, Salé, Maroc',
  telephone: '+212 6 61 30 67 32',
  email: 'megahomeequipement@gmail.com',
  ice: '003493933000092',
  rc: 'RC n° 39713',
  identifiantFiscal: '65942933',
  directeurPublication: 'Le gérant de MEGA HOME EQUIPEMENT SARL',
  hebergeurFront: 'Netlify, Inc. – 512 2nd Street, Suite 200, San Francisco, CA 94107, États-Unis',
  hebergeurBack: 'Sevalla (hébergement de l’API) – Frankfurt, Allemagne',
  zoneLivraison: 'Rabat, Salé et Kénitra',
  dateMaj: 'Octobre 2026',
};

function Page({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#F7F5F0] border-b border-[#E5E3DE] px-4 py-3">
        <div className="max-w-3xl mx-auto text-sm text-[#1A1A1A]/50 flex items-center gap-2">
          <Link to="/" className="hover:text-[#C9992C]">Accueil</Link>
          <span>/</span>
          <span className="text-[#1A1A1A] font-medium">{titre}</span>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1
          className="text-3xl md:text-4xl text-[#1A1A1A] mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {titre}
        </h1>
        <p className="text-xs text-[#1A1A1A]/40 mb-8">Dernière mise à jour : {INFOS.dateMaj}</p>
        <div className="space-y-6 text-sm leading-relaxed text-[#1A1A1A]/80">{children}</div>
      </div>
    </div>
  );
}

function H({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-bold text-[#1A1A1A] pt-2">{children}</h2>;
}

/* ─────────────── Mentions légales ─────────────── */
export function MentionsLegales() {
  usePageMeta('Mentions légales', 'Mentions légales du site Mega Home Equipement, magasin d’électroménager à Salé.');
  return (
    <Page titre="Mentions légales">
      <H>Éditeur du site</H>
      <ul className="space-y-1">
        <li><strong>Enseigne :</strong> {INFOS.nomCommercial}</li>
        <li><strong>Raison sociale :</strong> {INFOS.raisonSociale}</li>
        <li><strong>Forme juridique :</strong> {INFOS.formeJuridique}</li>
        <li><strong>Adresse :</strong> {INFOS.adresse}</li>
        <li><strong>Téléphone / WhatsApp :</strong> {INFOS.telephone}</li>
        <li><strong>E-mail :</strong> {INFOS.email}</li>
        <li><strong>ICE :</strong> {INFOS.ice}</li>
        <li><strong>Registre de commerce :</strong> {INFOS.rc}</li>
        <li><strong>Identifiant fiscal :</strong> {INFOS.identifiantFiscal}</li>
        <li><strong>Directeur de la publication :</strong> {INFOS.directeurPublication}</li>
      </ul>

      <H>Hébergement</H>
      <p>Site : {INFOS.hebergeurFront}.</p>
      <p>Serveur de données : {INFOS.hebergeurBack}.</p>

      <H>Propriété intellectuelle</H>
      <p>
        Les textes, logos et mises en page du site sont la propriété de {INFOS.nomCommercial}. Les marques
        et visuels des produits (Samsung, LG, Bosch, etc.) appartiennent à leurs propriétaires respectifs
        et sont utilisés à titre d’illustration commerciale. Toute reproduction sans autorisation est interdite.
      </p>

      <H>Responsabilité</H>
      <p>
        Les informations (prix, caractéristiques, disponibilité, photos) sont données à titre indicatif et
        peuvent être modifiées sans préavis. Les photos ne sont pas contractuelles. Le prix et la disponibilité
        sont confirmés lors de la commande par WhatsApp ou téléphone.
      </p>

      <H>Contact</H>
      <p>
        Pour toute question : <a className="text-[#C9992C] underline" href="https://wa.me/212661306732">WhatsApp {INFOS.telephone}</a>.
      </p>
    </Page>
  );
}

/* ─────────────── Conditions générales de vente ─────────────── */
export function CGV() {
  usePageMeta('Conditions générales de vente', 'Conditions de vente, livraison, garantie et retours chez Mega Home Equipement (Rabat, Salé, Kénitra).');
  return (
    <Page titre="Conditions générales de vente">
      <H>1. Objet</H>
      <p>
        Les présentes conditions régissent les ventes d’appareils électroménagers réalisées par
        {' '}{INFOS.nomCommercial} ({INFOS.adresse}) auprès de ses clients, conformément à la loi n° 31-08
        édictant des mesures de protection du consommateur.
      </p>

      <H>2. Commande</H>
      <p>
        Le site est un catalogue : la commande se fait par WhatsApp, par téléphone ou en magasin. Elle est
        considérée comme ferme après confirmation par notre équipe du produit, du prix, de la disponibilité
        et des modalités de livraison.
      </p>

      <H>3. Prix</H>
      <p>
        Les prix sont indiqués en dirhams marocains (DH), toutes taxes comprises. Ils sont indicatifs et
        susceptibles de changer ; le prix applicable est celui confirmé au moment de la commande. En cas
        d’erreur manifeste d’affichage, nous nous réservons le droit d’annuler la commande avant livraison.
      </p>

      <H>4. Paiement</H>
      <p>
        Le paiement s’effectue en magasin ou à la livraison, selon les modalités convenues lors de la
        confirmation de commande. Un acompte peut être demandé pour certains produits.
      </p>

      <H>5. Livraison</H>
      <p>
        Nous livrons dans la région de <strong>{INFOS.zoneLivraison}</strong>. Les frais et délais sont
        communiqués à la confirmation de commande et dépendent du produit et de l’adresse. Le client doit
        vérifier l’état du colis à la réception et signaler toute anomalie immédiatement.
      </p>

      <H>6. Installation</H>
      <p>
        Une installation professionnelle est proposée pour certains produits (climatisation, cuisson
        encastrable, etc.) selon conditions et tarifs communiqués à la commande.
      </p>

      <H>7. Garantie</H>
      <p>
        La durée de garantie varie selon le produit et la marque ; elle est précisée au moment de la
        commande et sur la facture ou le bon de garantie. La garantie couvre les défauts de fabrication
        et ne couvre pas les dommages dus à une mauvaise utilisation, une installation non conforme,
        un choc, une surtension ou un défaut d’entretien.
      </p>

      <H>8. Retours et échanges</H>
      <p>
        Tout produit non conforme à la commande ou livré endommagé doit être signalé dans un délai de
        48 heures après réception. Un produit déjà installé ou utilisé ne peut être ni repris ni échangé,
        sauf défaut couvert par la garantie. Le retour d’un produit en bon état, dans son emballage
        d’origine, reste soumis à l’accord préalable du magasin.
      </p>

      <H>9. Réclamations</H>
      <p>
        Pour toute réclamation, contactez-nous par WhatsApp ou téléphone au {INFOS.telephone}.
        Nous nous efforçons de répondre sous 48 heures ouvrables.
      </p>

      <H>10. Droit applicable</H>
      <p>
        Les présentes conditions sont soumises au droit marocain. En cas de litige, et à défaut d’accord
        amiable, les tribunaux compétents de Salé seront seuls compétents.
      </p>
    </Page>
  );
}

/* ─────────────── Politique de confidentialité ─────────────── */
export function Confidentialite() {
  usePageMeta('Politique de confidentialité', 'Comment Mega Home Equipement traite vos données personnelles (loi 09-08).');
  return (
    <Page titre="Politique de confidentialité">
      <p>
        {INFOS.nomCommercial} respecte votre vie privée. Cette page explique quelles données nous traitons
        et pourquoi, conformément à la loi n° 09-08 relative à la protection des personnes physiques à
        l’égard du traitement des données à caractère personnel (CNDP).
      </p>

      <H>Responsable du traitement</H>
      <p>{INFOS.raisonSociale} – {INFOS.adresse} – {INFOS.email}</p>

      <H>Données collectées</H>
      <p>
        Ce site est un catalogue : il ne comporte ni compte client ni paiement en ligne. Nous collectons
        uniquement les informations que vous nous communiquez volontairement lorsque vous nous contactez
        ou passez commande par WhatsApp ou téléphone (nom, numéro de téléphone, adresse de livraison,
        produit demandé).
      </p>

      <H>Finalités</H>
      <p>
        Ces données servent uniquement à traiter votre commande, organiser la livraison et l’installation,
        assurer le service après-vente et répondre à vos demandes. Elles ne sont ni vendues ni cédées à
        des tiers à des fins commerciales.
      </p>

      <H>Conservation</H>
      <p>Les données sont conservées le temps nécessaire au traitement de la commande et à la garantie, puis supprimées ou archivées.</p>

      <H>Vos droits</H>
      <p>
        Vous disposez d’un droit d’accès, de rectification et d’opposition sur vos données (articles 7, 8 et 9
        de la loi 09-08). Pour l’exercer, écrivez-nous : {INFOS.email} ou {INFOS.telephone}.
      </p>

      <H>Cookies et mesure d’audience</H>
      <p>
        Le site n’utilise pas de cookies publicitaires. Des outils techniques ou de mesure d’audience
        anonymisée peuvent être utilisés pour améliorer le site.
      </p>

      <H>Services tiers</H>
      <p>
        Les échanges par WhatsApp sont soumis aux conditions de WhatsApp (Meta). Le site est hébergé par Netlify
        et ses données par Sevalla / MongoDB Atlas.
      </p>
    </Page>
  );
}