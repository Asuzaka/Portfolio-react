// Import modules
import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { FaReply } from "react-icons/fa6";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// Import components
import NewReply from "./newReply";

function Reply({
  el,
  reFetchExisting,
  id,
  formRef,
  setComment1,
  setComment2,
  comment2,
}) {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user.user);

  const [replying, setReplying] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState(el.content);
  const [error, setError] = useState(null);

  const isOwner = user?._id === el.user._id;
  const profileImage = `${import.meta.env.VITE_BACKEND_URL}/public/users/${
    el.user.photo
  }`;
  const formattedDate = new Date(el.createdAt).toLocaleString();
  const replyUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/replies/${
    el._id
  }`;

  // Handle text change
  const handleContentChange = (e) => setContent(e.target.value);

  // Handle edit or save
  const handleEdit = async () => {
    if (!editMode) {
      return setEditMode(true);
    }

    if (content === el.content) {
      return setEditMode(false);
    }

    try {
      const response = await fetch(replyUrl, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error(t("error.fetch.update"));

      await reFetchExisting();
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setEditMode(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      const response = await fetch(replyUrl, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) throw new Error(t("error.fetch.delete"));

      await reFetchExisting();
      setError(null);
    } catch (err) {
      setError(err);
    }
  };

  // Show reply form under this reply
  const handleReply = () => {
    setComment1(false);
    setComment2(false);
    setReplying(true);
  };

  // If comment2 opens, close replying on this reply
  useEffect(() => {
    if (comment2) setReplying(false);
  }, [comment2]);

  return (
    <>
      <div className="ml-[10%] w-[90%] flex flex-col gap-3 p-4 rounded-lg bg-white/10 backdrop-blur-md shadow-md">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <img
            src={profileImage}
            alt="profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">{el.user.name}</h2>
            <p className="text-sm text-gray-300">{formattedDate}</p>
          </div>
        </div>

        {/* Reply Content */}
        {isOwner ? (
          <textarea
            rows="3"
            value={content}
            onChange={handleContentChange}
            disabled={!editMode}
            className={`w-full resize-none bg-transparent text-white font-medium p-2 rounded-lg focus:outline-none ${
              editMode ? "border border-white" : ""
            }`}
          />
        ) : (
          <p className="text-white text-lg">{el.content}</p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end items-center">
          {error && (
            <p className="text-red-500 text-sm mr-auto">{error.message}</p>
          )}
          {isOwner && (
            <>
              <button className="cursor-pointer" onClick={handleEdit}>
                {editMode ? (
                  <FaSave size={16} color="white" />
                ) : (
                  <MdModeEditOutline size={16} color="white" />
                )}
              </button>
              <button className="cursor-pointer" onClick={handleDelete}>
                <MdDelete size={16} color="white" />
              </button>
            </>
          )}
          <button onClick={handleReply} className="cursor-pointer">
            <FaReply size={16} color="white" />
          </button>
        </div>
      </div>

      {/* Reply Input under Reply */}
      {replying && (
        <div ref={formRef} className="ml-[10%] w-[90%]">
          <NewReply
            reFetchExisting={reFetchExisting}
            commentId={id}
            replyId={el._id}
          />
        </div>
      )}
    </>
  );
}

export default Reply;
