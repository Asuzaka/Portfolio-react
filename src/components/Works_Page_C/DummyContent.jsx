// Import modules
import { useTranslation } from "react-i18next";
// Import components
import figma from "../../assets/webp/figma.webp";
import { Link } from "react-router";

function DummyContent() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-5 text-xl">
      <Link className="text-center cursor-pointer text-xl lg:text-3xl underline text-white">
        {t("works.dummy.theme")}
      </Link>
      <div className="flex justify-center">
        <img className="lg:max-w-xl" src={figma} />
      </div>
      <p>{t("works.dummy.text")}</p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora, non
        corrupti illum amet at, totam quibusdam, molestias animi numquam
        voluptatibus dolorem fuga ex rerum unde! Corporis aspernatur nostrum
        velit exercitationem!
      </p>
    </div>
  );
}

export default DummyContent;
