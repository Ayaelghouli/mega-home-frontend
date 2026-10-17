import { useRef, useState } from 'react';

interface Props {
  src: string;
  alt: string;
}

const ZOOM = 2.5;

/**
 * Photo produit avec loupe : un carré suit la souris sur l'image,
 * et un panneau agrandi s'affiche à droite (écran large uniquement).
 * Sur mobile/tablette : simple image, pas de zoom.
 */
export default function ImageZoom({ src, alt }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [actif, setActif] = useState(false);
  // position du carré (en % du conteneur) et position du fond zoomé (en %)
  const [lens, setLens] = useState({ left: 0, top: 0 });
  const [fond, setFond] = useState({ x: 0, y: 0 });

  const taille = 100 / ZOOM; // taille du carré en % du conteneur

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    const x = ((e.clientX - box.left) / box.width) * 100;
    const y = ((e.clientY - box.top) / box.height) * 100;
    const left = Math.min(Math.max(x - taille / 2, 0), 100 - taille);
    const top = Math.min(Math.max(y - taille / 2, 0), 100 - taille);
    setLens({ left, top });
    setFond({
      x: (left / (100 - taille)) * 100,
      y: (top / (100 - taille)) * 100,
    });
  }

  return (
    <div className="relative mb-3">
      <div
        ref={ref}
        onMouseEnter={() => setActif(true)}
        onMouseLeave={() => setActif(false)}
        onMouseMove={onMove}
        className="relative rounded-xl overflow-hidden bg-white border border-[#E5E3DE] aspect-square p-6 flex items-center justify-center lg:cursor-crosshair"
      >
        <img src={src} alt={alt} className="w-full h-full object-contain" />

        {/* Carré de la loupe (écran large seulement) */}
        {actif && (
          <div
            className="hidden lg:block absolute pointer-events-none border border-[#C9992C] bg-[#C9992C]/10"
            style={{
              width: `${taille}%`,
              height: `${taille}%`,
              left: `${lens.left}%`,
              top: `${lens.top}%`,
            }}
          />
        )}
      </div>

      {/* Panneau agrandi à droite */}
      {actif && (
        <div
          className="hidden lg:block absolute top-0 left-full ml-4 w-full aspect-square z-30 rounded-xl border border-[#E5E3DE] bg-white shadow-xl pointer-events-none"
          style={{
            backgroundImage: `url(${src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${ZOOM * 100}%`,
            backgroundPosition: `${fond.x}% ${fond.y}%`,
          }}
        />
      )}
    </div>
  );
}