import knight from "../../assets/webp/knight_idle_sprite_sheet_128.webp";
import Darkknight from "../../assets/webp/knight_idle_sprite_sheet_128_dark.webp";

import "../../assets/style/Knight.css";
import { useGeneralContext } from "../../hooks/useGeneralContext";

function AnimatedKnight() {
  const { dark } = useGeneralContext();
  return (
    <div className="w-[134px] h-[140px] rounded-md border-emerald-500 dark:border-gray-800 border-8">
      <img
        className="knight mt-[-2px]"
        src={dark ? Darkknight : knight}
        alt="img"
      />
    </div>
  );
}

export default AnimatedKnight;
