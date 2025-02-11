import { GoHome } from "react-icons/go";
import { motion } from "motion/react";
import { spring } from "motion";
import { useNavigate } from "react-router";

function Logo() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="px-1 border rounded-sm shadow-xl bg-transparent border-white cursor-pointer"
      whileTap={{ scale: 0.9 }}
      transition={{ type: spring, stiffness: 300 }}
      onClick={() => navigate("/")}
    >
      <GoHome fontSize={35} color="#fff" />
    </motion.div>
  );
}

export default Logo;
