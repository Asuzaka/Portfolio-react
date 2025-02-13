import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Suspense, useState, lazy } from "react";
import Worksbutton from "../components/ui/Worksbutton";
import MiniLoading from "../components/ui/MiniLoading";

const WorksRenderSelected = lazy(() =>
  import("../components/WorksRenderSelected")
);

function Works() {
  const [activeTab, setActiveTab] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const listOfProjects = t("listOfProjects", { returnObjects: true });
  return (
    <div className="display flex flex-col gap-5 items-center px-2">
      <div className="flex text-white gap-4 text-xl dark:bg-black/50 bg-emerald-900/60 rounded-xl flex-col p-2 sm:px-3 sm:flex-row md:gap-16 md:px-8 md:py-6 lg:px-16 lg:py-10 items-center sm:h-[650px] lg:h-[690px] 2xl:h-[730px]">
        <div className="flex pt-5 sm:flex-col gap-4 overflow-scroll w-3xs sm:w-auto scroll-hidden">
          {listOfProjects.map((el, index) => (
            <Worksbutton
              index={index}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              key={index}
            >
              {el}
            </Worksbutton>
          ))}
        </div>
        <div className="border border-black dark:border-white rounded-md p-4 max-w-[76%] overflow-x-scroll scroll-hidden h-full">
          <Suspense fallback={<MiniLoading />}>
            <WorksRenderSelected activeTab={activeTab} />
          </Suspense>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-8 text-md">
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

export default Works;
