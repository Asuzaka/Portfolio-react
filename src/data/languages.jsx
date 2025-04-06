import zh from "../assets/webp/countries/China.webp";
import de from "../assets/webp/countries/Germany.webp";
import ja from "../assets/webp/countries/Japan.webp";
import ru from "../assets/webp/countries/Russia.webp";
import ko from "../assets/webp/countries/South-korea.webp";
import en from "../assets/webp/countries/United-states.webp";
import uz from "../assets/webp/countries/Uzbekistan.webp";

function useLanguages(translations) {
  const langWidth = 30;
  const languages = [
    {
      code: "uz",
      name: translations[0],
      flag: <img src={uz} width={langWidth} alt="uz" />,
    },
    {
      code: "en",
      name: translations[1],
      flag: <img src={en} width={langWidth} alt="en" />,
    },
    {
      code: "zh",
      name: translations[2],
      flag: <img src={zh} width={langWidth} alt="zh" />,
    },
    {
      code: "ko",
      name: translations[3],
      flag: <img src={ko} width={langWidth} alt="ko" />,
    },
    {
      code: "ru",
      name: translations[4],
      flag: <img src={ru} width={langWidth} alt="ru" />,
    },
    {
      code: "ja",
      name: translations[5],
      flag: <img src={ja} width={langWidth} alt="ja" />,
    },
    {
      code: "de",
      name: translations[6],
      flag: <img src={de} width={langWidth} alt="de" />,
    },
  ];
  return languages;
}

export default useLanguages;
