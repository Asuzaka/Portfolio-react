// Import modules
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { useWeakDevice } from "../hooks/WeakDeviceContext";

// Import components
import Navigation from "./Navigation";
import Game from "./Game";

function Layout({ children }) {
  const dark = useSelector((state) => state.theme.dark);
  const { isWeakDevice } = useWeakDevice();
  return (
    <div
      className={`${dark && "dark"} relative font-mono flex flex-col h-screen`}
    >
      {/* Header */}
      <header className="z-20 fixed w-full max-w-7xl left-[50%] translate-x-[-50%] top-0">
        <div className="w-full h-full relative">
          <Navigation />
          <div className="w-full h-full absolute z-[-1] backdrop-blur-xs top-0 rounded-3xl"></div>
        </div>
      </header>

      {/* Main Content Wrapper */}
      <div className="z-10 relative flex-1 flex flex-col">
        <div className="max-w-7xl mx-auto z-20 relative flex-1">
          <main className="mt-[106px] flex-1">
            {children ? children : <Outlet />}
          </main>
        </div>
      </div>

      {/* Background Animation Layer */}
      <div className="z-[1] fixed inset-0 bg-emerald-500 dark:bg-black">
        <div className="h-full blur-md opacity-70">
          <Game economy={true} superEconomy={isWeakDevice} />
        </div>
      </div>
    </div>
  );
}

export default Layout;
