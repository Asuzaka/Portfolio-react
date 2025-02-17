import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { MdOutlineStar } from "react-icons/md";
import PrimaryButton from "../components/ui/PrimaryButton";
import { BsTelegram } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import AnimatedKnight from "../components/ui/AnimatedKnight";
import AboutCard from "../components/ui/AboutCard";
import { FaGithub } from "react-icons/fa";

function About() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center relative px-2 sm:px-0">
      <div className="bg-emerald-900/60 dark:bg-black/50 rounded-3xl mx-auto px-4 sm:px-10 py-4 sm:py-8">
        <div className="flex flex-col items-center">
          <div className="flex gap-2 items-center mb-5 bg-gray-700/75 px-5 py-2 rounded-3xl drop-shadow-md">
            <span className="text-4xl text-emerald-400">
              {t("AboutPageTitle")}
            </span>
            <MdOutlineStar size={36} color="yellow" />
          </div>
          <AnimatedKnight />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 mt-6 mx-auto gap-x-10 gap-y-2">
          <AboutCard title={t("AboutFullNameTitle")}>
            {t("AboutFullName")}
          </AboutCard>
          <AboutCard title={t("AboutAgeTitle")}>{t("AboutAge")}</AboutCard>
          <AboutCard title={t("AboutEducationTitle")}>
            {t("AboutEducation")}
          </AboutCard>
          <AboutCard title={t("AboutLanguagesTitle")}>
            {t("AboutLangueges")} <br /> {t("AboutLangueges1")} <br />
            {t("AboutLangueges2")}
          </AboutCard>
          <AboutCard title={t("AboutTechnologyTitle")}>
            {t("AboutTechnology")}
          </AboutCard>
          <AboutCard title={t("AboutCommercialExTitle")}>
            {t("AboutCommercialEx")}
          </AboutCard>
          <AboutCard title={t("AboutProfessionTitle")}>
            {t("AboutProfession")}
          </AboutCard>
          <AboutCard title={t("AboutWpmTitle")}>{t("AboutWpm")}</AboutCard>
          <AboutCard title={t("AboutSocials")}>
            <a
              href="https://github.com/Asuzaka"
              className="bg-white rounded-full p-1 cursor-pointer"
            >
              <FaGithub size={18} color="black" />
            </a>
            <a
              href="https://t.me/ligvado"
              className="bg-white  rounded-full p-1 cursor-pointer"
            >
              <BsTelegram size={18} color="black" />
            </a>
            <a
              href="https://www.instagram.com/e6nulsya/"
              className="bg-white  rounded-full p-1 cursor-pointer"
            >
              <FaInstagram size={18} color="black" />
            </a>
          </AboutCard>
        </div>
      </div>
      <div className="flex mt-6 flex-col gap-3 sm:flex-row sm:gap-8">
        <PrimaryButton
          onClick={() => {
            navigate("/");
          }}
        >
          {t("OverallMsgGoBack")}
        </PrimaryButton>
        <PrimaryButton
          onClick={() => {
            navigate("/game");
          }}
        >
          {t("WorksPageMsgButton1")}
        </PrimaryButton>
      </div>
    </div>
  );
}

export default About;
