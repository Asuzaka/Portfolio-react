// Import modules
import { motion } from "motion/react";
import { useState } from "react";
import { useSelector } from "react-redux";

// Import components
import branch from "../../assets/webp/branch.webp";
import cosmicBranch from "../../assets/webp/cosmic-branch.webp";

const animationleft = {
  start: {
    top: 0,
    left: -50,
  },
  animate: {
    top: 0,
    left: -35,
  },
};

const animationright = {
  start: {
    top: -12,
    right: 0,
  },
  animate: {
    top: 0,
    right: -35,
  },
};

function PrimaryButton({
  children,
  onClick = () => {},
  addStyle = "",
  disabled = false,
}) {
  const dark = useSelector((state) => state.theme.dark);
  const [isHovering, setIsHovering] = useState(false);
  function onHover() {
    setIsHovering(true);
  }
  function onHoverLeave() {
    setIsHovering(false);
  }
  return (
    <div className="relative z-20">
      <motion.button
        disabled={disabled}
        onMouseEnter={onHover}
        onMouseLeave={onHoverLeave}
        onClick={onClick}
        className={`${addStyle}  dark:from-gray-800 dark:to-gray-600 dark:hover:from-gray-500 dark:hover:to-gray-700 w-64 px-6 py-3 bg-gradient-to-r from-emerald-800 to-emerald-300 hover:from-emerald-500 hover:to-emerald-600 cursor-pointer text-white font-bold text-lg rounded-lg shadow-lg hover:scale-105 transition-transfor transition-all`}
      >
        {/* gray-800 gray-600 */}
        {children}
      </motion.button>

      <motion.span
        variants={animationleft}
        animate={isHovering ? "animate" : ""}
        className="absolute z-[-1]  w-[70px] h-[70px]"
        style={{ left: "175px" }}
      >
        <img
          src={dark ? cosmicBranch : branch}
          width={dark ? 55 : 70}
          height={dark ? 55 : 70}
          alt="animation-part"
        ></img>
      </motion.span>
      <motion.span
        variants={animationright}
        animate={isHovering ? "animate" : "start"}
        style={{ top: "-10px", right: "10px" }}
        className="absolute z-[-1]  w-[70px] h-[70px] scale-[-1]"
      >
        <img
          src={dark ? cosmicBranch : branch}
          width={dark ? 55 : 70}
          height={dark ? 55 : 70}
          alt="animation-part"
        ></img>
      </motion.span>
    </div>
  );
}

export default PrimaryButton;
