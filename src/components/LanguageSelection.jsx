import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import us from "../assets/svg/us.svg";
import ru from "../assets/svg/ru.svg";
import uz from "../assets/svg/uz.svg";
const options = [
  {
    value: "en",
    label: (
      <>
        <img src={us} width="20" />
      </>
    ),
  },
  {
    value: "ru",
    label: (
      <>
        <img src={ru} width="20" />
      </>
    ),
  },
  {
    value: "uz",
    label: (
      <>
        <img src={uz} width="20" />
      </>
    ),
  },
];

function LanguageSelection() {
  const { i18n } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (selectedOption !== null) {
      i18n.changeLanguage(selectedOption.value);
    }
  }, [selectedOption, i18n]);

  return (
    <>
      <Select
        defaultValue={
          i18n.language === "en"
            ? options[0]
            : i18n.language === "ru"
            ? options[1]
            : i18n.language === "uz"
            ? options[2]
            : null
        }
        options={options}
        onChange={setSelectedOption}
      />
    </>
  );
}

export default LanguageSelection;
