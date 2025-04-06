// Import modules
import { useEffect, useState } from "react";
import { loadLanguage } from "../utils/i18n/i18n";
import { useTranslation } from "react-i18next";
import useLanguages from "../data/languages";

// Import components
import Modal from "./ui/Modal";
import LanguagesOnSelect from "./ui/LanguagesOnSelect";

function LanguageSelection() {
  const { t } = useTranslation();
  const languages = useLanguages(t("languages.array", { returnObjects: true }));
  const [selectedLang, setSelectedLang] = useState(() => {
    return (
      languages.find((el) => el.code == JSON.parse(localStorage.getItem("lng")))
        ?.flag || languages[1].flag
    );
  });

  useEffect(() => {
    loadLanguage(JSON.parse(localStorage.getItem("lng")));
  }, []);

  return (
    <Modal>
      <Modal.Open opens="language-select">
        <button className="bg-white rounded-full p-0.5 cursor-pointer">
          {selectedLang}
        </button>
      </Modal.Open>
      <Modal.Window name="language-select">
        <LanguagesOnSelect setSelectedLang={setSelectedLang} />
      </Modal.Window>
    </Modal>
  );
}

export default LanguageSelection;
