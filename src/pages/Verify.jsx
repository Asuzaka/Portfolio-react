// Import modules
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { fetchUser } from "../store/UserSlice";

function Verify() {
  //   Input Token
  const { token } = useParams();

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(t("user.verify.loading"));

  useEffect(() => {
    const handleEnter = async () => {
      setError(null);

      // Making a request
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/verify/${token}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || t("error.fetch.fail"));
        }
        // Fetch user after loggin in
        dispatch(fetchUser());

        setStatus("Success! You can close this window");
      } catch (error) {
        // If an error occurs
        setError(error.message);
        setStatus(t("user.verify.error"));
      }
    };

    handleEnter();
  }, [dispatch, token, t]);
  return (
    <div className="flex-1 flex items-center justify-center mt-[50%] md:mt-[60%] lg:mt-[75%]">
      <div className="bg-opacity-20 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-lg w-80 sm:w-96 border border-white border-opacity-30">
        <h2 className="text-center text-white text-2xl font-bold mb-4">
          {t("user.title")}
        </h2>
        <div className="mb-4">
          <h1
            className={`block text-white text-xl mb-2 text-center  ${
              error ? "bg-red-500" : "bg-emerald-500"
            } rounded-lg py-2`}
          >
            {status}
          </h1>
        </div>
        {/* Already verified Link */}
        <p className="mt-4 text-center text-white text-sm">
          <Trans
            i18nKey="user.verify.helper"
            components={[
              <Link
                className="text-emerald-900 hover:underline"
                to="/"
                key={0}
              />,
            ]}
          />
        </p>
      </div>
    </div>
  );
}

export default Verify;
