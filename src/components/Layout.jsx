import { Outlet } from "react-router";
import Navigation from "./Navigation";
import { useGeneralContext } from "../hooks/useGeneralContext";
import { motion } from "motion/react";
import Game from "./Game";
import { useWeakDevice } from "../hooks/WeakDeviceContext";

function Layout() {
  const { dark } = useGeneralContext();
  const { isWeakDevice } = useWeakDevice();
  return (
    <>
      <div className={`${dark && "dark"} relative font-mono`}>
        <motion.div className={`z-10 relative`}>
          <div className="max-w-7xl mx-auto z-20 relative">
            <header>
              <Navigation />
            </header>
            <main className="mt-10">{<Outlet />}</main>
          </div>
        </motion.div>
        <div className="z-[1] h-full w-full fixed top-0 left-0 bg-emerald-500 dark:bg-black ">
          <div className="h-full blur-md opacity-70">
            <Game economy={true} superEconomy={isWeakDevice} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
