import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import PrimaryButton from "../components/ui/PrimaryButton";

function Homepage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="relative flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 sm:mt-[250px] mt-16 ">
      {/* Top Section - Intro & Info */}
      <motion.div className="max-w-4xl text-center dark:bg-black/50 bg-emerald-900/60 text-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {t("WelcomeMsgHomepage")}
        </h1>
        <p className="text-lg md:text-xl leading-relaxed">
          {t("WelcomeMsgHomepageDesc")}
        </p>
      </motion.div>

      {/* Buttons Section */}
      <div className="mt-8 flex flex-col gap-2 md:gap-16 md:flex-row">
        <PrimaryButton
          onClick={() => {
            navigate("/works");
          }}
        >
          {t("WelcomeMsgHomepageButton1")}
        </PrimaryButton>
        <PrimaryButton
          onClick={() => {
            navigate("/about");
          }}
        >
          {t("WelcomeMsgHomepageButton2")}
        </PrimaryButton>
      </div>
    </div>
  );
}

export default Homepage;
