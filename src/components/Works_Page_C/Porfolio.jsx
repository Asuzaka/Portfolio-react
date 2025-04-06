// Import modules
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

function Porfolio() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-5 text-xl">
      <Link
        to="/"
        className="text-center cursor-pointer text-xl lg:text-3xl underline text-white"
      >
        {t("works.portfolio.theme")}
      </Link>
      <p>{t("works.portfolio.text")}</p>

      <p>[{t("works.portfolio.date")}]</p>
    </div>
  );
}

export default Porfolio;
