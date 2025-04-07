// GameLayout.jsx
import { useTranslation } from "react-i18next";

const GameLayout = ({ children, score, showGame, onStart, onExit }) => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full h-dvh bg-black text-white overflow-hidden">
      {/* Top Bar */}
      {showGame && (
        <div className="absolute top-0 left-0 w-full flex justify-between items-center px-4 py-2 bg-black bg-opacity-60 z-10">
          <h2 className="font-bold text-lg">{t("game.title")}</h2>
          <div className="flex gap-4 items-center">
            <p>
              {t("game.score")}: <span>{score}</span>
            </p>
            <button
              onClick={onExit}
              className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700"
            >
              {t("general.exit")}
            </button>
          </div>
        </div>
      )}

      {/* Game or Menu */}
      {!showGame ? (
        <div className="w-full h-full flex flex-col justify-center items-center gap-6 bg-gradient-to-b from-black to-gray-900">
          <h1 className="text-4xl font-bold">{t("game.menuTitle")}</h1>
          <button
            onClick={onStart}
            className="px-6 py-2 bg-green-500 text-black font-semibold rounded hover:bg-green-600 transition"
          >
            {t("game.start")}
          </button>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default GameLayout;
