import { MdDarkMode } from "react-icons/md";
import { useGeneralContext } from "../../hooks/useGeneralContext";
import { IoSunny } from "react-icons/io5";
import { motion } from "motion/react";

function ThemeSwitch() {
  const { setDark, dark } = useGeneralContext();

  return (
    <div className="flex bg-white/25 rounded-full items-center justify-center relative w-20 shadow-md py-1">
      <motion.div
        variants={{
          left: { left: 0 },
          right: { right: 0 },
        }}
        className={`absolute rounded-full bg-white dark:bg-black h-full w-10 z-0 shadow-md right-0`}
        animate={dark ? "left" : "right"}
      ></motion.div>
      <motion.button
        className="rounded-full w-10 flex items-center justify-center cursor-pointer"
        onClick={() => setDark(true)}
      >
        <MdDarkMode fontSize={25} className="z-10" color="white" />
      </motion.button>
      <motion.button
        className="rounded-full  w-10 flex items-center justify-center cursor-pointer"
        onClick={() => setDark(false)}
      >
        <IoSunny fontSize={25} className="z-10" color="yellow" />
      </motion.button>
    </div>
  );
}

export default ThemeSwitch;
