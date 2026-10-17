interface Props {
  /** Hauteur en pixels (la largeur suit). */
  taille?: number;
  /** Couleur de la maison, de l'ovale et du M. */
  couleur?: string;
  /** Couleur du H. */
  couleurH?: string;
  className?: string;
}

/**
 * Icône du logo Mega Home : toit + M H + ovale.
 * Version vectorielle recréée d'après l'enseigne du magasin.
 * Sur fond sombre : couleur="#C9992C" couleurH="#FFFFFF" (défaut).
 * Sur fond clair / jaune : couleur="#1A1A1A" couleurH="#FFFFFF" ou "#C9992C".
 */
export default function LogoIcon({
  taille = 48,
  couleur = '#C9992C',
  couleurH = '#FFFFFF',
  className,
}: Props) {
  return (
    <svg
      height={taille}
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mega Home Equipement"
      className={className}
      style={{ width: 'auto' }}
    >
      {/* Ovale sous les lettres */}
      <path
        d="M6 56 C6 68 28 76 50 76 C72 76 94 68 94 56 C94 62 72 66 50 66 C28 66 6 62 6 56 Z"
        fill={couleur}
      />
      <path d="M8 52 C16 44 84 44 92 52" stroke={couleur} strokeWidth="2.5" strokeLinecap="round" opacity="0" />

      {/* Toit */}
      <path d="M12 30 L50 6 L88 30" stroke={couleur} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Fenêtre du pignon (4 carrés) */}
      <g fill={couleur}>
        <rect x="45" y="14" width="4.2" height="4.2" rx="0.6" />
        <rect x="50.8" y="14" width="4.2" height="4.2" rx="0.6" />
        <rect x="45" y="19.8" width="4.2" height="4.2" rx="0.6" />
        <rect x="50.8" y="19.8" width="4.2" height="4.2" rx="0.6" />
      </g>

      {/* Lettre M */}
      <path
        d="M16 62 V30 H25 L33 46 L41 30 H50 V62 H42 V44 L35.5 57 H30.5 L24 44 V62 Z"
        fill={couleur}
      />
      {/* Lettre H */}
      <path
        d="M54 62 V30 H62.5 V42 H70.5 V30 H79 V62 H70.5 V50 H62.5 V62 Z"
        fill={couleurH}
      />
    </svg>
  );
}