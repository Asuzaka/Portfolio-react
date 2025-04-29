// Import modules
import { useState } from "react";
import { Link } from "react-router";
import { Trans, useTranslation } from "react-i18next";

// Import components
import PrimaryButton from "../components/ui/PrimaryButton";
import SignupSuccess from "../components/SignupSuccess";

function Signup() {
  // Component Logic
  const { t } = useTranslation();
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  //   Request Logic
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleEnter = async (e) => {
    e.preventDefault();

    // Check up for inputs
    const errors = {};
    if (formData.password != formData.passwordConfirm) {
      errors.passwordConfirm = t("error.validation.password.match");
    }
    if (formData.password.length < 8) {
      errors.password = t("error.validation.password.length");
    }
    if (!formData.email.includes("@")) {
      errors.email = t("error.validation.email");
    }
    if (formData.username.length < 3) {
      errors.username = t("error.validation.username.length");
    }

    // If there any input errors return
    if (!(Object.keys(errors).length === 0)) {
      setError(errors);
      return;
    }

    setIsLoading(true);
    setError(null);

    // Making a request
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/signup`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t("error.fetch.create"));
      }

      // No error move to the next step
      setSuccess(true);
    } catch (error) {
      // If an error occurs
      const errors = {};

      if (error.message.startsWith("Duplicate")) {
        const erroarray = error.message.split(" ");
        erroarray[1] = erroarray[1].slice(0, -1);
        errors[erroarray[1]] = t("error.fetch.duplicate", {
          item: erroarray[1],
        });
      } else {
        const errorarray = error.message.split(", ");
        errorarray[0] = errorarray[0].slice(24);
        for (let i = 0; i < errorarray.length; i++) {
          let a = errorarray[i].split(": ");
          errors[a[0]] = a[1];
        }
      }

      setError(errors);
    } finally {
      setIsLoading(false);
    }
  };
  return success ? (
    <SignupSuccess />
  ) : (
    <div className="flex-1 flex items-center justify-center mt-[20%] md:mt-[40%] lg:mt-[50%]">
      <div className="bg-opacity-20 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-lg w-80 sm:w-96 border border-white border-opacity-30">
        <h2 className="text-center text-white text-2xl font-bold mb-4">
          {t("user.title")}
        </h2>
        <form>
          {/* Username */}
          <div className="mb-4">
            <label className="block text-white text-sm mb-2" htmlFor="username">
              {t("user.signUp.username")}
            </label>
            <input
              disabled={isLoading}
              name="username"
              type="text"
              id="username"
              value={FormData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-emerald-900/20 bg-opacity-20 border border-white border-opacity-40 text-white rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none placeholder-white"
              placeholder={t("user.signUp.placeholder.username")}
            />
            {error?.username && (
              <p className="text-red-400 text-center">{error.username}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-white text-sm mb-2" htmlFor="email">
              {t("user.signUp.email")}
            </label>
            <input
              disabled={isLoading}
              value={formData.email}
              onChange={handleChange}
              name="email"
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-emerald-900/20 bg-opacity-20 border border-white border-opacity-40 text-white rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none placeholder-white"
              placeholder={t("user.signUp.placeholder.email")}
            />
            {error?.email && (
              <p className="text-red-400 text-center">{error.email}</p>
            )}
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-white text-sm mb-2" htmlFor="name">
              {t("user.signUp.name")}
            </label>
            <input
              disabled={isLoading}
              value={formData.name}
              onChange={handleChange}
              type="text"
              name="name"
              id="name"
              className="w-full px-4 py-2 bg-emerald-900/20 bg-opacity-20 border border-white border-opacity-40 text-white rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none placeholder-white"
              placeholder={t("user.signUp.placeholder.name")}
            />
            {error?.name && (
              <p className="text-red-400 text-center">{error.name}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-white text-sm mb-2" htmlFor="password">
              {t("user.signUp.password")}
            </label>
            <input
              name="password"
              disabled={isLoading}
              value={formData.password}
              onChange={handleChange}
              type="password"
              id="password"
              className="w-full px-4 py-2 bg-emerald-900/20 bg-opacity-20 border border-white border-opacity-40 text-white rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none placeholder-white"
              placeholder={t("user.signUp.placeholder.password")}
            />
            {error?.password && (
              <p className="text-red-400 text-center">{error.password}</p>
            )}
          </div>

          {/* Password Confirm */}
          <div className="mb-4">
            <label
              className="block text-white text-sm mb-2"
              htmlFor="passwordConfirm"
            >
              {t("user.signUp.passwordConfirm")}
            </label>
            <input
              name="passwordConfirm"
              disabled={isLoading}
              value={formData.passwordConfirm}
              onChange={handleChange}
              type="password"
              id="passwordConfirm"
              className="w-full px-4 py-2 bg-emerald-900/20 bg-opacity-20 border border-white border-opacity-40 text-white rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none placeholder-white"
              placeholder={t("user.signUp.placeholder.passwordConfirm")}
            />
            {error?.passwordConfirm && (
              <p className="text-red-400 text-center">
                {error.passwordConfirm}
              </p>
            )}
          </div>

          {/* Submit */}
          <PrimaryButton
            onClick={handleEnter}
            addStyle="w-full"
            disabled={isLoading}
          >
            {isLoading ? t("user.signUp.signingUp") : t("user.signUp.signUp")}
          </PrimaryButton>
        </form>
        {/* Already Account Link */}
        <p className="mt-4 text-center text-white text-sm">
          <Trans
            i18nKey="user.signUp.helper"
            components={[
              <Link
                key={0}
                className="text-emerald-900 hover:underline"
                to="/login"
              />,
            ]}
          />
        </p>
      </div>
    </div>
  );
}

export default Signup;
