// c:\projectgit\src\components\Galeria.jsx
import React, { useEffect, useState } from 'react';
import './Galeria.css';

export default function Galeria({ images = [], delay = 3500, onCuriosity = () => {} }) {
  const fotos = images.length
    ? images.map((it) => (typeof it === 'string' ? { src: it, alt: '' } : it))
    : [
        { src: `${import.meta.env.BASE_URL || './'}fotos/foto1.jpg`, alt: 'Foto 1', fallbackSrc: '' },
        { src: `${import.meta.env.BASE_URL || './'}fotos/foto2.jpg`, alt: 'Foto 2', fallbackSrc: '' },
        { src: `${import.meta.env.BASE_URL || './'}fotos/foto3.jpg`, alt: 'Foto 3', fallbackSrc: '' },
      ];

  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(() => fotos.map(() => false));

  useEffect(() => {
    if (fotos.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % fotos.length);
    }, delay);
    return () => clearInterval(timer);
  }, [fotos.length, delay]);

  const handleLoad = (i) => {
    setLoaded((prev) => {
      const copy = [...prev];
      copy[i] = true;
      return copy;
    });
  };

  const handleError = (e, i, fallback) => {
    if (fallback) e.currentTarget.src = fallback;
    handleLoad(i);
  };

  return (
    <section className="galeria-container-large" aria-roledescription="slideshow">
      <div className="slideshow-wrapper">
        {fotos.map((foto, i) => (
          <figure
            key={i}
            className={`slide ${i === index ? 'active' : ''} ${loaded[i] ? 'is-loaded' : 'is-loading'}`}
            aria-hidden={i !== index}
          >
            <div className="slide-placeholder" aria-hidden={loaded[i]}>
              <div className="slide-spinner" />
            </div>

            <img
              src={foto.src}
              alt={foto.alt || `Imagem ${i + 1}`}
              className="slide-img"
              loading="lazy"
              onLoad={() => handleLoad(i)}
              onError={(e) => handleError(e, i, foto.fallbackSrc)}
              draggable="false"
            />

            {foto.alt && <figcaption className="slide-caption">{foto.alt}</figcaption>}

            {/* Botão "Matar curiosidade" — apenas no slide ativo */}
            {i === index && (
              <button
                className="curiosity-button"
                onClick={() => onCuriosity(foto)}
                aria-label="Matar curiosidade"
                type="button"
              >
                Matar curiosidade
              </button>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}