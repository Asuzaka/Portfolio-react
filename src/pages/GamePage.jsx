// Import modules
import { useState } from "react";

// Import components
import Game from "../components/Game";
import Menu from "../components/ui/Menu";

function GamePage() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStart = () => {
    setIsPlaying(true); // Start the game
  };

  return (
    <div className="relative w-full h-dvh bg-black text-white overflow-hidden">
      {!isPlaying ? (
        <Menu onStart={handleStart} />
      ) : (
        <>
          <Game immortality={false} setIsPlaying={setIsPlaying} />
        </>
      )}
    </div>
  );
}

export default GamePage;
