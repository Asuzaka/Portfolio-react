// Import modules
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router";
// Import components
import calculator from "../../assets/webp/calculator.webp";

function Calculator() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col text-xl md:text-xl">
      <Link
        className="text-center cursor-pointer text-xl lg:text-3xl underline text-white"
        to="https://luminous-crisp-bcda1f.netlify.app/"
      >
        {t("works.calculator.theme")}
      </Link>
      <div className="flex justify-center">
        <img className="lg:max-w-xl" src={calculator} />
      </div>
      <p className="leading-relaxed text-wrap">
        <Trans
          i18nKey="works.calculator.text"
          components={[
            <Link
              className="underline"
              key={0}
              to="https://react.dev/reference/react/useReducer"
            >
              UseReducer
            </Link>,
            <Link
              className="underline"
              key={1}
              to="https://react.dev/reference/react/useState"
            >
              UseState
            </Link>,
          ]}
        />
      </p>
      <p>[{t("works.calculator.date")}]</p>
    </div>
  );
}

export default Calculator;
