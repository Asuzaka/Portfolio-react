// Import modules
import { useNavigate } from "react-router";
import { Trans, useTranslation } from "react-i18next";
import { MdOutlineStar } from "react-icons/md";
import { BsTelegram } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

// Import components
import PrimaryButton from "../components/ui/PrimaryButton";
import AnimatedKnight from "../components/ui/AnimatedKnight";
import AboutCard from "../components/ui/AboutCard";

function About() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center relative px-2 sm:px-0">
      <div className="bg-emerald-900/60 dark:bg-black/50 rounded-3xl mx-auto px-4 sm:px-10 py-4 sm:py-8">
        <div className="flex flex-col items-center">
          <div className="flex gap-2 items-center mb-5 bg-gray-700/75 px-5 py-2 rounded-3xl drop-shadow-md">
            <span className="text-4xl text-emerald-400">
              {t("about.title")}
            </span>
            <MdOutlineStar size={36} color="yellow" />
          </div>
          <AnimatedKnight />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 mt-6 mx-auto gap-x-10 gap-y-2">
          <AboutCard title={t("about.fullName")}>
            {t("about.values.fullName")}
          </AboutCard>
          <AboutCard title={t("about.age")}>{t("about.values.age")}</AboutCard>
          <AboutCard title={t("about.education")}>
            {t("about.values.education")}
          </AboutCard>
          <AboutCard title={t("about.languages")}>
            <Trans i18nKey="about.values.languages" />
          </AboutCard>
          <AboutCard title={t("about.technology")}>
            {t("about.values.technology")}
          </AboutCard>
          <AboutCard title={t("about.experience")}>
            {t("about.values.experience")}
          </AboutCard>
          <AboutCard title={t("about.profession")}>
            {t("about.values.profession")}
          </AboutCard>
          <AboutCard title={t("about.wpm")}>{t("about.values.wpm")}</AboutCard>
          <AboutCard title={t("about.socials")}>
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
      {/* Navigation buttons */}
      <div className="flex mt-6 flex-col gap-3 sm:flex-row sm:gap-8">
        <PrimaryButton
          onClick={() => {
            navigate("/");
          }}
        >
          {t("general.home")}
        </PrimaryButton>
        <PrimaryButton
          onClick={() => {
            navigate("/game");
          }}
        >
          {t("general.play")}
        </PrimaryButton>
      </div>
    </div>
  );
}

export default About;
