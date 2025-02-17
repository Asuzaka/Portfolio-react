import { useTranslation } from "react-i18next";
import figma from "../../assets/webp/figma.webp";

function DummyContent() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-5 text-xl">
      <a
        className="text-center cursor-pointer text-xl lg:text-3xl underline text-white"
        href="#"
      >
        {t("DummyContentTitle")}
      </a>
      <div className="flex justify-center">
        <img className="lg:max-w-xl" src={figma} />
      </div>
      <p>{t("DummyContenttext")}</p>
      <p>{t("DummyContenttext2")}</p>
    </div>
  );
}

export default DummyContent;
