import { useTranslation } from "react-i18next";
import calculator from "../../assets/webp/calculator.webp";

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
      <p className="leading-relaxed text-wrap">
        {t("Calculatortext1")}
        <a
          className="underline"
          href="https://react.dev/reference/react/useReducer"
        >
          UseReducer
        </a>
        {t("Calculatortext2")}
        <a
          className="underline"
          href="https://react.dev/reference/react/useState"
        >
          UseState
        </a>
        {t("Calculatortext3")}
      </p>
      <p>{t("Calculatordate")}</p>
    </div>
  );
}

export default Calculator;
