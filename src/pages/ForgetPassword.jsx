// Import modules
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router";
import { useState } from "react";

// Import components
import PrimaryButton from "../components/ui/PrimaryButton";
import SendSucces from "../components/SendSucces";

function ForgetPasword() {
  const { t } = useTranslation();
  const [success, setSucces] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEnter = async (e) => {
    // Preventing Reload
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Making a request
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/forgetPassword`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t("error.fetch.fail"));
      }
    } catch (error) {
      // If an error occurs
      setError(error.message);
    } finally {
      setIsLoading(false);
    }

    // If sent
    setSucces(true);
  };
  return success ? (
    <SendSucces />
  ) : (
    <div className="flex-1 flex items-center justify-center mt-[50%] md:mt-[60%] lg:mt-[75%]">
      <div className="bg-opacity-20 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-lg w-80 sm:w-96 border border-white border-opacity-30">
        <h2 className="text-center text-white text-2xl font-bold mb-4">
          {t("user.title")}
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-white text-sm mb-2" htmlFor="email">
              {t("user.forgetPassword.email")}
            </label>
            <input
              disabled={isLoading}
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-emerald-900/20 bg-opacity-20 border border-white border-opacity-40 text-white rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none placeholder-white"
              placeholder={t("user.forgetPassword.placeholder.email")}
            />
          </div>
          {error && (
            <div className="flex justify-center mb-4">
              <p className="text-red-400">{error}</p>
            </div>
          )}
          <PrimaryButton
            onClick={handleEnter}
            addStyle="w-full"
            disabled={isLoading}
          >
            {isLoading
              ? t("user.forgetPassword.sending")
              : t("user.forgetPassword.sendEmail")}
          </PrimaryButton>
        </form>
        {/* No Account Link */}
        <p className="mt-4 text-center text-white text-sm">
          <Trans
            i18nKey="user.forgetPassword.helper"
            components={[
              <Link
                to="/signup"
                key={0}
                className="text-emerald-900 hover:underline"
              />,
            ]}
          />
        </p>
      </div>
    </div>
  );
}

export default ForgetPasword;
