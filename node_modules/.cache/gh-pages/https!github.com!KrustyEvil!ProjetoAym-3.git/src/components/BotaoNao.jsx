import { useState, useRef, useEffect } from 'react';

const BotaoNao = () => {
  const [hoverCount, setHoverCount] = useState(0);
  const [hasMoved, setHasMoved] = useState(false); // controla se já fugiu
  const buttonRef = useRef(null);
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleInteraction = () => {
    setHoverCount(prev => prev + 1);
    setHasMoved(true); // marca que o botão já fugiu

    const button = buttonRef.current;

    if (button && containerRef.current) {
      const maxX = containerSize.width - button.offsetWidth - 20;
      const maxY = containerSize.height - button.offsetHeight - 20;

      const randomX = Math.min(Math.max(10, Math.random() * maxX), maxX);
      const randomY = Math.min(Math.max(10, Math.random() * maxY), maxY);

      button.style.left = `${randomX}px`;
      button.style.top = `${randomY}px`;
      button.style.transition = 'left 0.3s ease-out, top 0.3s ease-out';
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '200px',
      }}
    >
      <button
        ref={buttonRef}
        onMouseEnter={handleInteraction}
        onTouchStart={handleInteraction}
        className={`button-no ${hoverCount > 2 ? 'animate-pulse' : ''}`}
        style={{
          position: 'absolute',
          left: hasMoved ? undefined : '50%',
          top: hasMoved ? undefined : '50%',
          transform: hasMoved ? undefined : 'translate(-50%, -50%)',
          transition: 'left 0.3s ease-out, top 0.3s ease-out',
        }}
      >
        {hoverCount > 3 ? 'Talvez...' : hoverCount > 1 ? 'Quer mesmo?' : 'Não'}
      </button>
    </div>
  );
};

export default BotaoNao;