import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router";
import { GeneralProvider } from "./hooks/useGeneralContext";
import Homepage from "./pages/Homepage";
import About from "./pages/about";
import Layout from "./components/Layout";
import "./utils/i18n/i18n";
import Game from "./components/Game";
import Works from "./pages/Works";
import { WeakDeviceProvider } from "./hooks/WeakDeviceContext";

export default function App() {
  return (
    <WeakDeviceProvider>
      <GeneralProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path="/about" element={<About />} />
              <Route path="/works" element={<Works />} />
            </Route>
            {/* Pure Routes without Layout covering them */}
            <Route path="/game" element={<Game immortality={false} />}></Route>
          </Routes>
        </BrowserRouter>
      </GeneralProvider>
    </WeakDeviceProvider>
  );
}
