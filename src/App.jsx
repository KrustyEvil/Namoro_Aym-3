// c:\projectgit\src\App.jsx
import { useState, useRef } from 'react';
import BotaoNao from './components/BotaoNao';
import BotaoSim from './components/BotaoSim';
import Galeria from './components/Galeria';
import CuriosidadePage from './CuriosidadePage';
import confetti from 'canvas-confetti';
import './App.css';
import HomePage from './HomePage';
import IntroducaoPage from './introducaopage';

function App() {
  const [tela, setTela] = useState('home');
  const [aceitou, setAceitou] = useState(false);
  const [curiosityImage, setCuriosityImage] = useState(null); // imagem selecionada
  const audioRef = useRef(null);

  const handleSimClick = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((e) => console.log('Erro ao tocar música:', e));
    }
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff1493', '#ff69b4', '#db2777'],
    });
    setAceitou(true);
  };

  // mover para o topo do componente (disponível para todos os branches)
  const openCuriosity = (foto) => {
    console.log('openCuriosity chamado com foto:', foto);
    setCuriosityImage(foto);
    setTela('curiosidade');
  };

  const closeCuriosity = () => {
    setCuriosityImage(null);
    setTela('pedido');
  };

  if (tela === 'home') return <HomePage onStart={() => setTela('introducao')} />;
  if (tela === 'introducao') return <IntroducaoPage onContinue={() => setTela('pedido')} />;

  if (tela === 'pedido') {
    const galleryImages = [
      { src: `${import.meta.env.BASE_URL || './'}fotos/foto1.jpg`, alt: 'Encontro marcante' },
      { src: `${import.meta.env.BASE_URL || './'}fotos/foto2.jpg`, alt: 'Momento especial' },
      { src: `${import.meta.env.BASE_URL || './'}fotos/foto3.jpg`, alt: 'Batalhando juntos' },
    ];

    return (
      <div className="app-container relative min-h-screen overflow-hidden">
        <audio ref={audioRef} loop src={`${import.meta.env.BASE_URL || ''}musica.mp3`} className="hidden" />
        {aceitou && (
          <img
            src={`${import.meta.env.BASE_URL || ''}fundo.jpg`}
            alt="Fundo"
            className="absolute inset-0 w-full h-full object-cover -z-10"
            style={{ transform: 'rotate(-90deg)' }}
          />
        )}

        {!aceitou ? (
          <>
            <h1 className="main-title animate-fade-in text-black">Quer continuar namorando comigo por toda vida? 💘</h1>
            <div className="button-group">
              <BotaoSim onClick={handleSimClick} />
              <BotaoNao />
            </div>
            <p className="text-gray-600 text-sm">* Não aceitar é crime!!!</p>
          </>
        ) : (
          <div className="acceptance-message animate-fade-in relative z-10">
            <h2 className="acceptance-title text-black">Ebaaa! Você disse SIM! 🎉</h2>
            <p className="acceptance-text text-black">Você acabou de tomar a melhor decisão da sua vida rsrs!!!  💖</p>
<p className="acceptance-text text-black">AMO MUITO VOCÊ MINHA AMORA </p>
            {/* Galeria: passa callback onCuriosity */}
            <Galeria images={galleryImages} delay={3500} onCuriosity={openCuriosity} />
          </div>
        )}
      </div>
    );
  }

  // renderiza a página de curiosidade como um branch independente
  if (tela === 'curiosidade' && curiosityImage) {
    return <CuriosidadePage image={curiosityImage} duration={5} onClose={closeCuriosity} />;
  }

  return null;
}

export default App;