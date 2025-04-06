// Import modules
import { motion, AnimatePresence } from "framer-motion";
// Import components
import Calculator from "./Works_Page_C/Calculator";
import TheWildOasis from "./Works_Page_C/TheWildOasis";
import DummyContent from "./Works_Page_C/DummyContent";
import Porfolio from "./Works_Page_C/Porfolio";

function WorksRenderSelected({ activeTab }) {
  const components = [Calculator, TheWildOasis, Porfolio, DummyContent];
  const SelectedComponent = components[activeTab] || DummyContent;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.4 }}
        className="w-full h-full"
      >
        <SelectedComponent />
      </motion.div>
    </AnimatePresence>
  );
}

export default WorksRenderSelected;
