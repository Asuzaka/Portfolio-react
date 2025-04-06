// Import modules
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

// Import components
import PrimaryButton from "./ui/PrimaryButton";

function SignupSuccess() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/"); // Navigate the user to the homepage or any other page
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        className="max-w-xl text-center dark:bg-black/50 bg-emerald-900/60 text-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {t("user.signSucces.title")}
        </h1>
        <p className="text-lg md:text-xl leading-relaxed mb-6">
          {t("user.signSucces.text")}
        </p>
        <p className="text-lg md:text-xl leading-relaxed mb-6">
          {t("user.signSucces.advice")}
        </p>
        <p className="text-lg md:text-xl leading-relaxed mb-6">
          {t("user.signSucces.note")}
        </p>
      </motion.div>

      {/* Close Button */}
      <div className="mt-8 flex flex-col gap-2 md:gap-16 md:flex-row">
        <PrimaryButton onClick={handleClose}>
          {t("user.signSucces.close")}
        </PrimaryButton>
      </div>
    </div>
  );
}

export default SignupSuccess;
