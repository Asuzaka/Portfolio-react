import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { MdOutlineStar } from "react-icons/md";
import PrimaryButton from "../components/ui/PrimaryButton";
import { BsTelegram } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import AnimatedKnight from "../components/ui/AnimatedKnight";
import AboutCard from "../components/ui/AboutCard";
import { FaGithub } from "react-icons/fa";
import { useGeneralContext } from "../hooks/useGeneralContext";

function About() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { dark } = useGeneralContext();
  return (
    <div className="flex flex-col items-center relative">
      <div className="bg-emerald-900/60 dark:bg-black/50 rounded-3xl mx-auto px-10 py-8">
        <div className="flex flex-col items-center">
          <div className="flex gap-2 items-center mb-5 bg-gray-700/75 px-5 py-2 rounded-3xl drop-shadow-md">
            <span className="text-4xl text-emerald-400">
              Ligvado's Achivements
            </span>
            <MdOutlineStar size={36} color="yellow" />
          </div>
          <AnimatedKnight />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 mt-6 mx-auto gap-x-10 gap-y-2">
          <AboutCard title="Full Name">Yuldashev Khurshid</AboutCard>
          <AboutCard title="Age">18, was born in 2006</AboutCard>
          <AboutCard title="Education">High school</AboutCard>
          <AboutCard title="Languages">
            Native Uzbek, <br /> Russian C1, <br /> English B2 (certification)
          </AboutCard>
          <AboutCard title="Technology">React, Node js, Next</AboutCard>
          <AboutCard title="Commercial Experience">No experience</AboutCard>
          <AboutCard title="Profession">Front-end Web dev </AboutCard>
          <AboutCard title="WPM">around 65</AboutCard>
          <AboutCard title="socials">
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
      <div className="absolute top-16 left-0"></div>
    </div>
  );
}

export default About;
