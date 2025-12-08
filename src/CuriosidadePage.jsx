// c:\projectgit\src\CuriosidadePage.jsx
import React, { useEffect, useMemo, useState } from 'react';
import './Curiosidade.css';

function calcRemaining(target) {
  const now = new Date();
  const diff = Math.max(0, target.getTime() - now.getTime()); // ms
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { diff, totalSeconds, days, hours, minutes, seconds, now };
}

function makeTargetForYear(year) {
  return new Date(year, 11, 24, 15, 0, 0);
}

export default function CuriosidadePage({ image, onClose = () => {}, targetDate = null }) {
  if (!image) return null;

  const finalTarget = useMemo(() => {
    if (targetDate instanceof Date) return targetDate;
    const now = new Date();
    let target = makeTargetForYear(now.getFullYear());
    if (target.getTime() <= now.getTime()) {
      target = makeTargetForYear(now.getFullYear() + 1);
    }
    return target;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(() => calcRemaining(finalTarget));
  const [revealed, setRevealed] = useState(timeLeft.totalSeconds === 0);

  useEffect(() => {
    setTimeLeft(calcRemaining(finalTarget));
    setRevealed((t) => t || calcRemaining(finalTarget).totalSeconds === 0);

    if (calcRemaining(finalTarget).totalSeconds === 0) {
      setRevealed(true);
      return;
    }

    const id = setInterval(() => {
      const next = calcRemaining(finalTarget);
      setTimeLeft(next);
      if (next.totalSeconds === 0) {
        setRevealed(true);
        clearInterval(id);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [finalTarget]);

  return (
    <div className="curiosity-page" role="dialog" aria-modal="true" aria-label="Contagem regressiva">
      <div className="curiosity-card">
        <img src={image.src} alt={image.alt || 'Curiosidade'} className="curiosity-image" />

        <div className="curiosity-overlay">
          {!revealed ? (
            <div className="countdown" aria-live="polite">
              <div className="count-grid" style={{ alignItems: 'center', justifyContent: 'center' }}>
                <div className="count-item">
                  <div className="count-number">{String(timeLeft.days).padStart(2, '0')}</div>
                  <div className="count-label">Dias</div>
                </div>
                <div className="count-item">
                  <div className="count-number">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="count-label">Horas</div>
                </div>
                <div className="count-item">
                  <div className="count-number">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="count-label">Min</div>
                </div>
                <div className="count-item">
                  <div className="count-number">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="count-label">Seg</div>
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <button className="btn-close" onClick={onClose}>Fechar</button>
              </div>
            </div>
          ) : (
            <div className="reveal" role="status" aria-live="polite">
              <h2>Revelação</h2>
              <p>Pronto! Agora você matou a curiosidade 💖</p>
              <button className="btn-close" onClick={onClose}>Voltar</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}