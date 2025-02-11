import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

function Homepage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="relative flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 sm:mt-[250px] mt-16 ">
      {/* Top Section - Intro & Info */}
      <motion.div className="max-w-4xl text-center bg-black/50 text-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {t("WelcomeMsgHomepage")}
        </h1>
        <p className="text-lg md:text-xl leading-relaxed">
          {t("WelcomeMsgHomepageDesc")}
        </p>
      </motion.div>

      {/* Buttons Section */}
      <div className="mt-8 flex flex-col gap-4 md:flex-row">
        <motion.button
          onClick={() => {
            navigate("/works");
          }}
          className="w-64 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-600 text-white font-bold text-lg rounded-lg shadow-lg hover:scale-105 transition-transform"
        >
          {t("WelcomeMsgHomepageButton1")}
        </motion.button>
        <motion.button
          onClick={() => {
            navigate("/about");
          }}
          className="w-64 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-600 text-white font-bold text-lg rounded-lg shadow-lg hover:scale-105 transition-transform"
        >
          {t("WelcomeMsgHomepageButton2")}
        </motion.button>
      </div>
    </div>
  );
}

export default Homepage;
