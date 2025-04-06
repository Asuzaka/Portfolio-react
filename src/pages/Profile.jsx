// Import modules
import { useDispatch, useSelector } from "react-redux";
import { BiSolidError } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import { useState } from "react";
import { Link } from "react-router";
import { Trans, useTranslation } from "react-i18next";
import { fetchUser } from "../store/UserSlice";

// Import components
import PrimaryButton from "../components/ui/PrimaryButton";

function Profile() {
  // Component logic
  const { t } = useTranslation();
  const user = useSelector((state) => state.user.user);
  const [selectedImage, setSelectedImage] = useState(null);
  const [dataForm, setDataForm] = useState({
    name: user.name,
    description: user.description,
  });
  const normalDate = new Date(user.createdAt).toLocaleDateString();

  // Request logic
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById("file-input").click();
  };

  const handleSave = async () => {
    if (
      dataForm.name == user.name &&
      dataForm.description == user.description &&
      !selectedImage
    )
      return;
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", dataForm.name);
      formData.append("description", dataForm.description);

      if (selectedImage) {
        formData.append("photo", selectedImage);
      }
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/me`,
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        }
      );

      if (!response.ok)
        throw new Error(response.message || t("error.fetch.fail"));
      // If everthing is ok re-fetch-user
      dispatch(fetchUser());
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex gap-10 text-white px-2 sm:px-0">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* User Data */}
        <div className="grid grid-cols-3 rounded-3xl p-10 gap-x-10 bg-opacity-20 backdrop-blur-md shadow-lg border border-white border-opacity-30">
          {/* Users-avatar */}
          <div className="flex items-center justify-center">
            <div className="flex flex-col gap-3 items-center">
              <img
                className="size-24 rounded-full cursor-pointer"
                src={`${import.meta.env.VITE_BACKEND_URL}/public/users/${
                  user.photo
                }`}
                alt="profile-picture"
                onClick={handleImageClick}
              ></img>
              <h3>{user.username}</h3>
              {/* Hidden file input */}
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
          {/* Users-information */}
          <div className="col-span-2 flex flex-col gap-2">
            <div className="flex flex-col gap-0.5">
              <label className="text-sm mb-2" htmlFor="email">
                {t("profile.email")}:
              </label>
              <input
                className="w-full px-2 py-1 bg-emerald-900/20 bg-opacity-20 border border-white border-opacity-40 text-white rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none placeholder-white"
                name="email"
                id="email"
                value={user.email}
                disabled={true}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <label className="text-sm mb-2">{t("profile.name")}:</label>
              <input
                className="w-full px-2 py-1 bg-emerald-900/20 bg-opacity-20 border border-white border-opacity-40 text-white rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none placeholder-white"
                onChange={handleChange}
                value={dataForm.name}
                name="name"
              />
            </div>
            <PasswordField />
            <div className="flex gap-2 mt-2 items-center">
              {t("profile.verification")}:
              {user.isVerified ? (
                <VscVerifiedFilled size={24} color="blue" />
              ) : (
                <BiSolidError size={24} color="red" />
              )}
            </div>
            <p>
              {t("profile.date")}: {normalDate}
            </p>
          </div>
        </div>
        {/* Description */}
        <div className="rounded-3xl p-10 bg-opacity-20 backdrop-blur-md shadow-lg border border-white border-opacity-30 min-w-[350px]">
          <div className="flex flex-col gap-0.5">
            <label>{t("profile.description")}</label>
            <textarea
              className="w-full px-4 py-2 bg-emerald-900/20 bg-opacity-20 border border-white border-opacity-40 text-white rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none placeholder-white resize-none"
              value={dataForm.description}
              onChange={handleChange}
              name="description"
              rows="4"
            />
          </div>
          <div className="mt-3">
            <PrimaryButton onClick={handleSave} addStyle="w-full">
              {isLoading ? t("general.saving") : t("general.save")}
            </PrimaryButton>
          </div>
          {error && <p className="text-red-400 text-center">{error}</p>}
        </div>
        {/* Users Comments */}
      </div>
      <div className="rounded-3xl p-10 bg-opacity-20 backdrop-blur-md shadow-lg border border-white border-opacity-30">
        <h1>{t("profile.comments")}</h1>
      </div>
    </div>
  );
}

// Seperate comoponent for password-reset-url
function PasswordField() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-0.5 w-fit relative group">
      <label className="text-md mb-2">{t("profile.password.title")}</label>
      <input
        className="cursor-help w-full px-2 py-1 bg-emerald-900/20 bg-opacity-20 border border-white border-opacity-40 text-white rounded-md focus:ring-2 focus:ring-green-300 focus:outline-none placeholder-white"
        value={"a-b-c-d"}
        type="password"
        readOnly
      />
      {/* Tooltip (remains visible when hovering the parent) */}
      <div className="absolute top-full mt-2 w-64 p-2 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Trans
          i18nKey="profile.password.explanation"
          components={[
            <Link
              className="text-blue-400 underline hover:text-blue-300"
              key={0}
              to="/forgetPassword"
            />,
          ]}
        />
      </div>
    </div>
  );
}

export default Profile;
