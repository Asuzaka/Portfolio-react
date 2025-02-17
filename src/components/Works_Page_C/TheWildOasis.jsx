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
      <p>
        {t("Oasistext1")}
        <a className="underline" href="https://supabase.com">
          Supabase
        </a>
        {t("Oasistext2")}
        <a className="underline" href="https://authjs.dev">
          Auth js
        </a>
        {t("Oasistext3")}
        <a
          className="underline"
          href="https://www.udemy.com/user/jonasschmedtmann/"
        >
          Jonas Schmedtmann
        </a>
        {t("Oasistext4")}
      </p>
      <p>{t("Oasisdate")}</p>
    </div>
  );
}

export default TheWildOasis;
