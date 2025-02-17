import { Outlet } from "react-router";
import Navigation from "./Navigation";

import { useGeneralContext } from "../hooks/useGeneralContext";
import { useWeakDevice } from "../hooks/WeakDeviceContext";

import Game from "./Game";

function Layout() {
  const { dark } = useGeneralContext();
  const { isWeakDevice } = useWeakDevice();
  return (
    <>
      <div className={`${dark && "dark"} relative font-mono`}>
        <header className="z-20 fixed w-full max-w-7xl left-[50%] translate-x-[-50%] top-0">
          <div className="w-full h-full relative">
            <Navigation />
            <div className="w-full h-full absolute z-[-1] backdrop-blur-xs top-0 rounded-3xl"></div>
          </div>
        </header>
        <div className="z-10 relative">
          <div className="max-w-7xl mx-auto z-20 relative">
            <main className="mt-[106px]">{<Outlet />}</main>
          </div>
        </div>

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
