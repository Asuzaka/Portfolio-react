// Import modules
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

// Import components
import playerImg from "../assets/webp/char.webp";
import stoneImg from "../assets/webp/stone.webp";
import bgImg from "../assets/webp/bg.webp";
import bgDark from "../assets/webp/bg-dark.webp";
import playerDark from "../assets/webp/player-dark.webp";
import stoneDark from "../assets/webp/stone-dark.webp";
import "../assets/style/Game.css";

function Game({
  immortality = true,
  economy = false,
  superEconomy = false,
  setIsPlaying = () => {},
}) {
  // Game Logic
  const [score, setScore] = useState(0);
  const [playerXCord, setPlayerXCord] = useState(window.innerWidth / 2);
  const [playerYCord, setPlayerYCord] = useState(window.innerHeight - 70);
  const [active, setActive] = useState(true);
  const [stones, setStones] = useState([]);

  const keysPressed = useRef(new Set());
  const animationFrame = useRef(null);
  const stoneInterval = useRef(null);
  const maxStones = 10;
  const stoneSpeed = 1;
  const spawnRate = 1000;
  const playerSize = 40;

  // Other things
  const mobile = window.innerWidth < 640;
  const dark = useSelector((state) => state.theme.dark);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Movement on Mobile
  const touchStartRef = useRef(null);

  const handleTouchStart = (e) => {
    if (economy) return; //Case for Background-Animation
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e) => {
    if (economy) return; //Case for Background-Animation
    if (!touchStartRef.current) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    // Move based on touch direction
    setPlayerXCord((prev) => prev + deltaX * 1); // Adjust speed factor
    setPlayerYCord((prev) => prev + deltaY * 1); // Adjust speed factor

    // Update reference for smoother movement
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = () => {
    if (economy) return; //Case for Background-Animation
    touchStartRef.current = null; // Reset touch reference
  };

  // Movement on Pc
  useEffect(() => {
    if (mobile) return;
    if (economy) return; // Case for Animation
    function handleKeyDown(event) {
      if (!active) return;
      keysPressed.current.add(event.key);
      if (!animationFrame.current) movePlayer();
    }

    function handleKeyUp(event) {
      keysPressed.current.delete(event.key);
      if (keysPressed.current.size === 0) {
        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      }
    }

    function movePlayer() {
      let xChange = 0,
        yChange = 0;
      const keys = Array.from(keysPressed.current);

      if (keys.includes("ArrowUp")) yChange -= 5;
      if (keys.includes("ArrowDown")) yChange += 5;
      if (keys.includes("ArrowRight")) xChange += 5;
      if (keys.includes("ArrowLeft")) xChange -= 5;

      setPlayerXCord((prev) =>
        Math.max(0, Math.min(window.innerWidth - 50, prev + xChange))
      );
      setPlayerYCord((prev) =>
        Math.max(0, Math.min(window.innerHeight - 50, prev + yChange))
      );

      animationFrame.current = requestAnimationFrame(movePlayer);
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationFrame.current);
    };
  }, [active, economy, mobile]);
  // Stone Spawns
  useEffect(() => {
    if (superEconomy) return; // Case for weak devices
    function spawnStone() {
      if (!active) return;
      setStones((prev) => {
        if (prev.length >= maxStones) return prev;
        const size = Math.random() * 40 + 20;
        return [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: Math.random() * (window.innerWidth - size),
            y: 0,
            size,
          },
        ];
      });
    }

    stoneInterval.current = setInterval(spawnStone, spawnRate);
    return () => clearInterval(stoneInterval.current);
  }, [active, superEconomy]);
  // Stone Falling
  useEffect(() => {
    if (superEconomy) return; // Case for weak devices
    function moveStones() {
      if (!active) return;
      setStones((prev) =>
        prev
          .map((stone) => ({ ...stone, y: stone.y + stoneSpeed }))
          .filter((stone) => stone.y < window.innerHeight)
      );
      requestAnimationFrame(moveStones);
    }

    const stoneAnimation = requestAnimationFrame(moveStones);
    return () => cancelAnimationFrame(stoneAnimation);
  }, [active, superEconomy]);
  // Check for Collision
  useEffect(() => {
    if (economy) return;
    if (!active) return;
    if (immortality) return; // Case for Animation not to end
    function checkCollision() {
      for (const stone of stones) {
        if (
          playerXCord < stone.x + stone.size &&
          playerXCord + playerSize > stone.x &&
          playerYCord < stone.y + stone.size &&
          playerYCord + playerSize > stone.y
        ) {
          setActive(false);
          return;
        }
      }
      requestAnimationFrame(checkCollision);
    }

    const collisionCheck = requestAnimationFrame(checkCollision);
    return () => cancelAnimationFrame(collisionCheck);
  }, [stones, playerXCord, playerYCord, active, immortality, economy]);

  function restartGame() {
    setPlayerXCord(window.innerWidth / 2);
    setPlayerYCord(window.innerHeight - 70);
    setStones([]);
    setActive(true);
    setScore(0);
  }

  useEffect(() => {
    if (!active) return;
    const scoreInterval = setInterval(() => {
      setScore((prev) => prev + 1); // Increment the score every second
    }, 1000);

    return () => clearInterval(scoreInterval);
  }, [active]);

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="h-dvh absolute top-0 left-0 z-[20] w-full  bg-black overflow-hidden "
      style={{
        backgroundImage: `url(${dark ? bgDark : bgImg})`,
        backgroundSize: "cover",
      }}
    >
      {/* Score Display - Inside the Game */}
      {active && (
        <div className="absolute top-0 left-0 z-50 w-full text-white font-mono text-xl p-4">
          Score: {score}
        </div>
      )}
      {/* Player */}
      <img
        src={dark ? playerDark : playerImg}
        alt="Player"
        style={{
          position: "absolute",
          top: playerYCord,
          left: playerXCord,
          width: "50px",
          height: "50px",
        }}
        className="select-none"
      />

      {/* Falling Stones */}
      {stones.map((stone) => (
        <img
          key={stone.id}
          src={dark ? stoneDark : stoneImg}
          alt="Falling Stone"
          style={{
            position: "absolute",
            top: stone.y,
            left: stone.x,
            width: stone.size,
            height: stone.size,
          }}
          className="select-none"
        />
      ))}

      {/* Game Over Screen */}
      {!active && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 text-white gap-5 font-mono">
          <h1 className="text-3xl"> {t("game.over")}</h1>
          <h6 className="text-lg">
            {t("game.yourScore")}: {score}
          </h6>
          <div className="flex flex-col gap-2">
            <button
              onClick={restartGame}
              className="px-4 py-2 bg-white text-black rounded cursor-pointer"
            >
              {t("game.restart")}
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-white text-black rounded cursor-pointer"
            >
              {t("general.home")}
            </button>
            <button
              className="px-4 py-2 bg-white text-black rounded cursor-pointer"
              onClick={() => setIsPlaying(false)}
            >
              {t("game.menu")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
