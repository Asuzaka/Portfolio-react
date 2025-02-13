import { useTranslation } from "react-i18next";
import calculator from "../../assets/img/calculator.png";

function Calculator() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col text-xl md:text-xl">
      <a
        className="text-center cursor-pointer text-xl lg:text-3xl underline text-white"
        href="https://luminous-crisp-bcda1f.netlify.app/"
      >
        {t("CalculatorTitle")}
      </a>
      <div className="flex justify-center">
        <img className="lg:max-w-xl" src={calculator} />
      </div>
      <p className="leading-relaxed text-wrap">{t("Calculatortext")}</p>
      <p>{t("Calculatordate")}</p>
    </div>
  );
}

export default Calculator;
