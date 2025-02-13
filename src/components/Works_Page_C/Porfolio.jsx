import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

function Porfolio() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-5 text-xl">
      <a
        className="text-center cursor-pointer text-xl lg:text-3xl underline text-white"
        onClick={() => navigate("/")}
      >
        {t("Portfoliostitle")}
      </a>
      <p>{t("PortfoliosContent")}</p>

      <p>{t("PortfoliosDate")}</p>
    </div>
  );
}

export default Porfolio;
