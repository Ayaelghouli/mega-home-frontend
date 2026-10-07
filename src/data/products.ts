export type Category =
  | 'Réfrigérateurs'
  | 'Machines à laver'
  | 'Téléviseurs'
  | 'Climatisation'
  | 'Cuisson'
  | 'Petit électroménager';

export interface Product {
  id: string;
  name: string;
  brand: string;
  reference: string;
  category: Category;
  price: number;
  originalPrice?: number;
  promoLabel?: string;
  inStock: boolean;
  images: string[];
  specs: { label: string; value: string }[];
  description: string;
}

export const CATEGORIES: { name: Category; icon: string; image: string }[] = [
  {
    name: 'Réfrigérateurs',
    icon: '🧊',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=300&fit=crop&auto=format',
  },
  {
    name: 'Machines à laver',
    icon: '🫧',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=300&fit=crop&auto=format',
  },
  {
    name: 'Téléviseurs',
    icon: '📺',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?w=400&h=300&fit=crop&auto=format',
  },
  {
    name: 'Climatisation',
    icon: '❄️',
    image: 'https://images.unsplash.com/photo-1625216269877-cdb4b2d8fc45?w=400&h=300&fit=crop&auto=format',
  },
  {
    name: 'Cuisson',
    icon: '🍳',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format',
  },
  {
    name: 'Petit électroménager',
    icon: '☕',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&auto=format',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Réfrigérateur No Frost 400L Inox',
    brand: 'Samsung',
    reference: 'SAM-RF400NF',
    category: 'Réfrigérateurs',
    price: 7490,
    originalPrice: 8990,
    promoLabel: '-17%',
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&h=700&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&h=700&fit=crop&auto=format',
    ],
    specs: [
      { label: 'Capacité', value: '400 litres' },
      { label: 'Classe énergétique', value: 'A++' },
      { label: 'Type', value: 'No Frost' },
      { label: 'Couleur', value: 'Inox' },
      { label: 'Dimensions', value: '185 × 60 × 65 cm' },
      { label: 'Garantie', value: '2 ans' },
    ],
    description:
      'Réfrigérateur No Frost grande capacité avec technologie Twin Cooling Plus pour une conservation optimale des aliments.',
  },
  {
    id: '2',
    name: 'Réfrigérateur Combiné 350L Blanc',
    brand: 'Beko',
    reference: 'BKO-CN350W',
    category: 'Réfrigérateurs',
    price: 4290,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&h=700&fit=crop&auto=format',
    ],
    specs: [
      { label: 'Capacité', value: '350 litres' },
      { label: 'Classe énergétique', value: 'A+' },
      { label: 'Type', value: 'Combiné' },
      { label: 'Couleur', value: 'Blanc' },
      { label: 'Garantie', value: '2 ans' },
    ],
    description: 'Réfrigérateur combiné économique avec grand espace de stockage.',
  },
  {
    id: '3',
    name: 'Machine à laver 8kg 1400 tours',
    brand: 'LG',
    reference: 'LG-F4WN408S',
    category: 'Machines à laver',
    price: 5990,
    originalPrice: 6990,
    promoLabel: '-14%',
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&h=700&fit=crop&auto=format',
    ],
    specs: [
      { label: 'Capacité', value: '8 kg' },
      { label: 'Vitesse d\'essorage', value: '1400 tr/min' },
      { label: 'Classe énergétique', value: 'A+++' },
      { label: 'Programmes', value: '14 programmes' },
      { label: 'Garantie', value: '2 ans' },
    ],
    description:
      'Machine à laver frontale haute performance avec moteur Direct Drive et technologie AI DD.',
  },
  {
    id: '4',
    name: 'Lave-linge 7kg Vapeur',
    brand: 'Brandt',
    reference: 'BRD-BFK7120W',
    category: 'Machines à laver',
    price: 3890,
    inStock: false,
    images: [
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&h=700&fit=crop&auto=format',
    ],
    specs: [
      { label: 'Capacité', value: '7 kg' },
      { label: 'Vitesse d\'essorage', value: '1200 tr/min' },
      { label: 'Classe énergétique', value: 'A++' },
    ],
    description: 'Lave-linge avec fonction vapeur anti-allergènes.',
  },
  {
    id: '5',
    name: 'Téléviseur QLED 65" 4K UHD',
    brand: 'Samsung',
    reference: 'SAM-QE65Q80B',
    category: 'Téléviseurs',
    price: 12990,
    originalPrice: 15990,
    promoLabel: 'PROMO',
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?w=600&h=700&fit=crop&auto=format',
    ],
    specs: [
      { label: 'Taille', value: '65 pouces' },
      { label: 'Résolution', value: '4K UHD 3840×2160' },
      { label: 'Technologie', value: 'QLED' },
      { label: 'HDR', value: 'HDR 1500' },
      { label: 'Smart TV', value: 'Tizen OS' },
      { label: 'Garantie', value: '2 ans' },
    ],
    description: 'Téléviseur QLED haut de gamme avec processeur Neural Quantum 4K.',
  },
  {
    id: '6',
    name: 'TV LED 55" 4K Android',
    brand: 'Hisense',
    reference: 'HIS-55A7GQ',
    category: 'Téléviseurs',
    price: 5490,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?w=600&h=700&fit=crop&auto=format',
    ],
    specs: [
      { label: 'Taille', value: '55 pouces' },
      { label: 'Résolution', value: '4K UHD' },
      { label: 'Smart TV', value: 'Android TV' },
    ],
    description: 'Téléviseur LED économique avec Android TV intégré.',
  },
  {
    id: '7',
    name: 'Climatiseur Inverter 18000 BTU',
    brand: 'Midea',
    reference: 'MID-MGA-18N8D6',
    category: 'Climatisation',
    price: 6290,
    promoLabel: 'ÉTÉ',
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1625216269877-cdb4b2d8fc45?w=600&h=700&fit=crop&auto=format',
    ],
    specs: [
      { label: 'Puissance', value: '18000 BTU' },
      { label: 'Type', value: 'Inverter' },
      { label: 'Classe énergétique', value: 'A++' },
      { label: 'Surface couverte', value: 'Jusqu\'à 40 m²' },
    ],
    description: 'Climatiseur réversible Inverter haute performance avec Wi-Fi intégré.',
  },
  {
    id: '8',
    name: 'Cuisinière 5 feux 60cm Inox',
    brand: 'Beko',
    reference: 'BKO-FSE62120DX',
    category: 'Cuisson',
    price: 4590,
    originalPrice: 5290,
    promoLabel: '-13%',
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=700&fit=crop&auto=format',
    ],
    specs: [
      { label: 'Feux', value: '5 feux gaz' },
      { label: 'Four', value: 'Électrique 65L' },
      { label: 'Largeur', value: '60 cm' },
      { label: 'Finition', value: 'Inox brossé' },
    ],
    description: 'Cuisinière mixte 5 feux avec four multifonction et grill.',
  },
  {
    id: '9',
    name: 'Machine à café à capsules',
    brand: 'Nespresso',
    reference: 'NSP-ESSENZA-MINI',
    category: 'Petit électroménager',
    price: 890,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=700&fit=crop&auto=format',
    ],
    specs: [
      { label: 'Pression', value: '19 bars' },
      { label: 'Capacité réservoir', value: '0,6 L' },
      { label: 'Chauffe', value: '25 secondes' },
    ],
    description: 'Machine à café compacte compatible capsules Nespresso.',
  },
  {
    id: '10',
    name: 'Aspirateur Robot Wi-Fi',
    brand: 'Xiaomi',
    reference: 'XMI-ROBOT-E10',
    category: 'Petit électroménager',
    price: 1990,
    originalPrice: 2490,
    promoLabel: '-20%',
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=700&fit=crop&auto=format',
    ],
    specs: [
      { label: 'Aspiration', value: '2500 Pa' },
      { label: 'Autonomie', value: '200 minutes' },
      { label: 'Connectivité', value: 'Wi-Fi + App Mi Home' },
    ],
    description: 'Aspirateur robot intelligent avec cartographie laser et contrôle via application.',
  },
];

export const BRANDS = ['Samsung', 'LG', 'Beko', 'Hisense', 'Midea', 'Brandt', 'Nespresso', 'Xiaomi'];
