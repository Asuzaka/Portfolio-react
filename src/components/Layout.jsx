import { Outlet } from "react-router";
import Navigation from "./Navigation";
import { useGeneralContext } from "../hooks/useGeneralContext";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import Game from "./Game";
import { useWeakDevice } from "../hooks/WeakDeviceContext";

function Layout() {
  const { dark } = useGeneralContext();
  const { t } = useTranslation();
  const { isWeakDevice } = useWeakDevice();
  return (
    <>
      <motion.div
        className={`${
          dark && "dark"
        } bg-emerald-500 dark:bg-black backdrop-blur-2xl relative font-mono`}
      >
        <div className="max-w-7xl mx-auto z-20 relative">
          <header>
            <Navigation />
          </header>
          <main className="mt-10">{<Outlet />}</main>
        </div>
        <div className="z-[1] h-dvh w-full absolute top-0 bg-emerald-500 dark:bg-black ">
          <div className="blur-md opacity-70">
            <Game economy={true} superEconomy={isWeakDevice} />
          </div>
        </div>
      </motion.div>
      <footer className="fixed bottom-15 z-10 left-[50%] translate-x-[-50%] bg-transparent">
        {/* Footer or Extra Info */}
        <div className="mt-12 text-center text-white/70 text-sm">
          <p>{t("OverallMsgWarning")}</p>
        </div>
      </footer>
    </>
  );
}

export default Layout;
