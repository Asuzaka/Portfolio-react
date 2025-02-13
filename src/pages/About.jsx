import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../components/ui/PrimaryButton";
function About() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center items-center gap-3 text-md">
      <p className="text-white">{t("AboutPageMsgText")}</p>
      <PrimaryButton
        onClick={() => {
          navigate("/");
        }}
      >
        {t("OverallMsgGoBack")}
      </PrimaryButton>
    </div>
  );
}

export default About;
