import { useTranslation } from "react-i18next";
import Oasis from "../../assets/webp/Oasis.webp";

function TheWildOasis() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-5 text-xl">
      <a
        className="text-center cursor-pointer text-xl lg:text-3xl underline text-white"
        href="https://the-wild-oasis-test-chi.vercel.app/"
      >
        {t("OasisTitle")}
      </a>
      <div className="flex justify-center">
        <img className="lg:max-w-xl" src={Oasis} />
      </div>
      <p>{t("Oasistext")}</p>
      <p>{t("Oasisdate")}</p>
    </div>
  );
}

export default TheWildOasis;
