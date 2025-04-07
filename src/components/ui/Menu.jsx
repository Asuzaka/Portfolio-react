// Import modules
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

function Menu({ onStart }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-6 bg-gradient-to-b from-black to-gray-900">
      <h1 className="text-4xl font-bold text-white text-center">
        Welcome to Falling Rocks!
      </h1>
      <div className="flex flex-col gap-2">
        <button
          onClick={onStart}
          className="cursor-pointer px-6 py-2 bg-green-500 text-black font-semibold rounded hover:bg-green-600 transition"
        >
          {t("game.start")}
        </button>
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer px-6 py-2 bg-green-500 text-black font-semibold rounded hover:bg-green-600 transition"
        >
          {t("general.home")}
        </button>
      </div>
    </div>
  );
}

export default Menu;
