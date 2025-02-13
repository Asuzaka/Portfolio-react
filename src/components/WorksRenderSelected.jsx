import { Suspense } from "react";
import MiniLoading from "./ui/MiniLoading";
import Calculator from "./Works_Page_C/Calculator";
import TheWildOasis from "./Works_Page_C/TheWildOasis";
import DummyContent from "./Works_Page_C/DummyContent";
import Porfolio from "./Works_Page_C/Porfolio";

function WorksRenderSelected({ activeTab }) {
  return (
    <Suspense fallback={<MiniLoading />}>
      {activeTab === 0 && <Calculator />}
      {activeTab === 1 && <TheWildOasis />}
      {activeTab === 2 && <Porfolio />}
      {(activeTab > 2 || activeTab === null) && <DummyContent />}
    </Suspense>
  );
}

export default WorksRenderSelected;
