import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
function About() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center items-center gap-3 text-md">
      <p className="text-white">{t("AboutPageMsgText")}</p>
      <motion.button
        onClick={() => {
          navigate("/");
        }}
        className="w-64 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-600 text-white font-bold text-lg rounded-lg shadow-lg hover:scale-105 transition-transform"
      >
        {t("OverallMsgGoBack")}
      </motion.button>
    </div>
  );
}

export default About;
