// Import modules
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useState } from "react";

// Import components
import PrimaryButton from "../components/ui/PrimaryButton";
import ChangeSucces from "../components/ChangeSuccess";

function ResetPassword() {
  const { token } = useParams();
  const { t } = useTranslation();
  const [success, setSucces] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
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
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/users/resetPassword/${token}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, passwordConfirm }),
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

    // If password changed notify
    setSucces(true);
  };

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handlePasswordConfirmChange(e) {
    setPasswordConfirm(e.target.value);
  }

  return success ? (
    <ChangeSucces />
  ) : (
    <div className="flex-1 flex items-center justify-center mt-[50%] md:mt-[60%] lg:mt-[75%]">
      <div className="bg-opacity-20 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-lg w-80 sm:w-96 border border-white border-opacity-30">
        <h2 className="text-center text-white text-2xl font-bold mb-4">
          {t("user.title")}
        </h2>
        {/* Token */}
        <div className="mb-4">
          <label className="block text-white text-sm mb-2" htmlFor="tokeb">
            {t("user.passwordReset.token")}
          </label>
          <input
            name="token"
            disabled={true}
            value={token}
            type="text"
            id="token"
            className="w-full px-4 py-2 bg-emerald-900/20 bg-opacity-20 border border-white border-opacity-40 text-white rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none placeholder-white"
          />
        </div>
        {/* Password */}
        <div className="mb-4">
          <label className="block text-white text-sm mb-2" htmlFor="password">
            {t("user.passwordReset.password")}
          </label>
          <input
            name="password"
            disabled={isLoading}
            value={password}
            onChange={handlePasswordChange}
            type="password"
            id="password"
            className="w-full px-4 py-2 bg-emerald-900/20 bg-opacity-20 border border-white border-opacity-40 text-white rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none placeholder-white"
            placeholder={t("user.passwordReset.placeholder.password")}
          />
        </div>

        {/* Password Confirm */}
        <div className="mb-4">
          <label
            className="block text-white text-sm mb-2"
            htmlFor="passwordConfirm"
          >
            {t("user.passwordReset.passwordConfirm")}
          </label>
          <input
            name="passwordConfirm"
            disabled={isLoading}
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            type="password"
            id="passwordConfirm"
            className="w-full px-4 py-2 bg-emerald-900/20 bg-opacity-20 border border-white border-opacity-40 text-white rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none placeholder-white"
            placeholder={t("user.passwordReset.placeholder.passwordConfirm")}
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
            ? t("user.passwordReset.changing")
            : t("user.passwordReset.change")}
        </PrimaryButton>
      </div>
    </div>
  );
}
export default ResetPassword;
