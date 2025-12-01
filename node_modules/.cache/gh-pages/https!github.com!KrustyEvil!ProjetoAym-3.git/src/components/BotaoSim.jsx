import { useState } from 'react';

const BotaoSim = ({ onClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick();
    setTimeout(() => setIsClicked(false), 1000);
  };

  return (
    <button
      onClick={handleClick}
      className={`button-yes ${isClicked ? 'animate-pulse' : ''}`}
    >
      Sim 💖
    </button>
  );
};

export default BotaoSim;