// Import modules
import { loadLanguage } from "../../utils/i18n/i18n";
import { useTranslation } from "react-i18next";

// Import components
import useLanguages from "../../data/languages";

function LanguagesOnSelect({ onCloseModal, setSelectedLang }) {
  const { t } = useTranslation();
  const languages = useLanguages(t("languages.array", { returnObjects: true }));
  function handleSelect(code, flag) {
    // Local storage
    localStorage.setItem("lng", JSON.stringify(code));
    // Actions
    setSelectedLang(flag);
    loadLanguage(code);
    onCloseModal();
  }

  return (
    <div className="font-mono dark:text-white flex flex-col gap-9">
      {/* Explanation of languages selection */}
      <div className="max-w-[400px]">
        <h1 className="text-2xl">{t("languages.title")}</h1>
      </div>
      {/* Languages selection */}
      <div className="text-center flex w-full">
        <ul className="flex flex-col gap-2 justify-center w-full">
          {languages.map((el) => (
            <li
              className="flex w-full px-4 py-3 rounded-md shadow hover:transform hover:translate-0.5 hover:bg-black/10 dark:hover:bg-white/40 dark:shadow-white"
              key={el.code}
            >
              <button
                className="cursor-pointer flex gap-[10%] w-full text-lg font-bold"
                onClick={() => handleSelect(el.code, el.flag)}
              >
                {el.flag} {el.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LanguagesOnSelect;
