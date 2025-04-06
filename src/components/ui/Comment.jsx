// Import modules
import { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FaReply } from "react-icons/fa6";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useTranslation } from "react-i18next";

// Import components
import Reply from "./reply";
import NewReply from "./newReply";
import MiniLoading from "./MiniLoading";

const PAGE_LIMIT = 5;

function Comment({ el, reFetchExisting, formRef, setComment1 }) {
  const page = useRef(1);
  const loadingRef = useRef(false);
  const noMoreRef = useRef(false);
  const user = useSelector((state) => state.user.user);
  const { t } = useTranslation();
  const [persist, setPersist] = useState(false);
  const [comment2, setComment2] = useState(false);
  const [show, setShow] = useState(false);
  const [replies, setReplies] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState(el.content);
  const [error, setError] = useState(null);

  const isOwner = user?._id === el.user._id;
  const profileImage = `${import.meta.env.VITE_BACKEND_URL}/public/users/${
    el.user.photo
  }`;
  const formattedDate = new Date(el.createdAt).toLocaleString();

  const handleContentChange = (e) => setContent(e.target.value);

  const handleEdit = async () => {
    if (!editMode) {
      setEditMode(true);
      return;
    }

    if (content === el.content) {
      setEditMode(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/comments/${el._id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        }
      );

      if (!response.ok) throw new Error(t("error.fetch.update"));

      await reFetchExisting();
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setEditMode(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/comments/${el._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error(t("error.fetch.delete"));

      await reFetchExisting();
      setError(null);
    } catch (err) {
      setError(err);
    }
  };

  // Dropdown fetch function
  const ShowReplies = async () => {
    try {
      loadingRef.current = true;
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/replies/${el._id}?page=${
          page.current
        }&limit=${PAGE_LIMIT}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error(t("error.fetch.load"));

      const data = await response.json();

      setReplies(data.data);
      page.current = page.current + 1;
    } catch (err) {
      setError(err);
    } finally {
      loadingRef.current = false;
    }
  };

  // Automatic loading function
  const loadReplies = useCallback(async () => {
    if (loadingRef.current || noMoreRef.current || !show) return;

    loadingRef.current = true;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/replies/${el._id}?page=${
          page.current
        }&limit=${PAGE_LIMIT}`,
        { credentials: "include" }
      );

      if (!res.ok) throw new Error(t("error.fetch.load"));

      const data = await res.json();

      if (data.data.length === 0) {
        noMoreRef.current = true;
        return;
      }

      setReplies((prev) => [...prev, ...data.data]);
      page.current += 1;
    } catch (err) {
      setError(err);
    } finally {
      loadingRef.current = false;
    }
  }, [el._id, show, t]);

  // Handle Dropdown
  function handleClickShowReplies() {
    if (show) {
      setShow(!show);
      page.current = 1;
      setComment1(true);
      return;
    }
    if (!persist) {
      ShowReplies();
      setPersist(true);
    }
    setShow(!show);
  }

  // Fetch Latest Comments (for editing/deleting)
  const reFetchExistingReply = async () => {
    const totalLoaded = page.current * PAGE_LIMIT;

    try {
      loadingRef.current = true;

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/replies/${
          el._id
        }?page=1&limit=${totalLoaded}`,
        { credentials: "include" }
      );

      if (!res.ok) throw new Error(t("error.fetch.load"));

      const data = await res.json();
      setReplies(data.data);
    } catch (err) {
      setError(err);
    } finally {
      loadingRef.current = false;
    }
  };

  function handleLoad() {
    loadReplies();
  }
  function handleReply() {
    setComment1(false);
    setComment2(true);
  }

  return (
    <>
      <div className="flex flex-col gap-3 p-4 rounded-lg bg-white/10 backdrop-blur-md shadow-md">
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

        {/* Comment Content */}
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
          <button
            onClick={handleClickShowReplies}
            className="flex gap-2 items-center text-white cursor-pointer"
          >
            {show ? (
              <IoMdArrowDropup size={16} color="white" />
            ) : (
              <IoMdArrowDropdown size={16} color="white" />
            )}{" "}
            {el.replies.length}{" "}
            {el.replies.length === 1
              ? t("comments.comment.reply.single")
              : t("comments.comment.reply.plural")}
          </button>
        </div>
      </div>
      {comment2 && (
        <div ref={formRef} className="ml-[10%] w-[90%]">
          <NewReply reFetchExisting={reFetchExistingReply} commentId={el._id} />
        </div>
      )}
      {loadingRef.current && (
        <div className="ml-[10%] w-[90%] flex justify-center">
          <MiniLoading />
        </div>
      )}
      {show &&
        replies.map((el2) => (
          <Reply
            el={el2}
            key={el2._id}
            id={el._id}
            reFetchExisting={reFetchExistingReply}
            formRef={formRef}
            setComment1={setComment1}
            setComment2={setComment2}
            comment2={comment2}
          />
        ))}
      {show && (
        <div className="flex ml-[10%] w-[90%] justify-center">
          <button
            disabled={noMoreRef.current}
            onClick={handleLoad}
            className="w-full py-2 cursor-pointer rounded-md shadow-md hover:shadow-lg text-white bg-emerald-600 dark:bg-gray-800 border border-white "
          >
            {noMoreRef.current
              ? t("comments.comment.noMore")
              : t("comments.comment.load")}
          </button>
        </div>
      )}
    </>
  );
}

export default Comment;
