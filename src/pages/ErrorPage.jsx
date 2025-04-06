// Import modules
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";

// Import components
import PrimaryButton from "../components/ui/PrimaryButton";

function ErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  // IMPORTANT TECHNIQUE
  const errorMessage = location.state?.errorMessage || t("error.error500.text");
  const errorCode = location.state?.errorCode || t("error.error500.code");

  return (
    <div className="relative flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 sm:mt-[250px] mt-16">
      {/* Top Section - Error Message */}
      <motion.div
        className="max-w-4xl text-center dark:bg-black/50 bg-emerald-900/60 text-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-6xl md:text-7xl font-bold mb-4">{errorCode}</h1>
        <p className="text-lg md:text-xl leading-relaxed mb-6">
          {errorMessage}
        </p>
        <p className="text-lg md:text-xl leading-relaxed mb-6">
          {t("error.support")}
        </p>
      </motion.div>

      {/* Navigation button */}
      <div className="mt-8 flex flex-col gap-2 md:gap-16 md:flex-row">
        <PrimaryButton
          onClick={() => {
            navigate("/");
          }}
        >
          {t("general.home")}
        </PrimaryButton>
      </div>
    </div>
  );
}

export default ErrorPage;
