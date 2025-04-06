// Import modules
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router";

// Import components
import Oasis from "../../assets/webp/Oasis.webp";

function TheWildOasis() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-5 text-xl">
      <Link
        className="text-center cursor-pointer text-xl lg:text-3xl underline text-white"
        to="https://the-wild-oasis-test-chi.vercel.app/"
      >
        {t("works.oasis.theme")}
      </Link>
      <div className="flex justify-center">
        <img className="lg:max-w-xl" src={Oasis} />
      </div>
      <p>
        <Trans
          i18nKey="works.oasis.text"
          components={[
            <Link key={0} to="https://supabase.com" className="underline" />,
            <Link key={1} to="https://authjs.dev" className="underline" />,
            <Link
              key={2}
              to="https://www.udemy.com/user/jonasschmedtmann/"
              className="underline"
            />,
          ]}
        />
      </p>
      <p>[{t("works.oasis.date")}]</p>
    </div>
  );
}

export default TheWildOasis;
