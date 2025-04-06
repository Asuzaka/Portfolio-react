// Import modules
import { useSelector } from "react-redux";

// Import components
import knight from "../../assets/webp/knight_idle_sprite_sheet_128.webp";
import Darknight from "../../assets/webp/knight_idle_sprite_sheet_128_dark.webp";
import "../../assets/style/Knight.css";

function AnimatedKnight() {
  const dark = useSelector((state) => state.theme.dark);
  return (
    <div className="w-[134px] h-[140px] rounded-md border-emerald-500 dark:border-gray-800 border-8">
      <img
        className="knight mt-[-2px]"
        src={dark ? Darknight : knight}
        alt="img"
      />
    </div>
  );
}

export default AnimatedKnight;
