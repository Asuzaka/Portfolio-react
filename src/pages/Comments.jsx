// Import modules
import { useEffect, useState, useRef, useCallback } from "react";
import { FaPen } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

// Import components
import NewCommentForm from "../components/ui/newComment";
import MiniLoading from "../components/ui/MiniLoading";
import Comment from "../components/ui/Comment";

const PAGE_LIMIT = 5;
const SCROLL_THRESHOLD = 100;

function Comments() {
  // Translation
  const { t } = useTranslation();
  // Pagination + Control Refs
  const page = useRef(1);
  const loadingRef = useRef(false);
  const noMoreRef = useRef(false);
  const formRef = useRef(null); // For scrolling

  // State
  const [Comment1, setComment1] = useState(true);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Latest Comments (for editing/deleting)
  const reFetchExisting = async () => {
    const totalLoaded = page.current * PAGE_LIMIT;

    try {
      setLoading(true);
      loadingRef.current = true;

      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/comments?page=1&limit=${totalLoaded}`,
        { credentials: "include" }
      );

      if (!res.ok) throw new Error(res.message || t("error.fetch.fail"));

      const data = await res.json();
      setComments(data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };

  // Load Next Page of Comments
  const loadComments = useCallback(async () => {
    if (loadingRef.current || noMoreRef.current) return;

    setLoading(true);
    loadingRef.current = true;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/comments?page=${
          page.current
        }&limit=${PAGE_LIMIT}`,
        { credentials: "include" }
      );

      if (!res.ok) throw new Error(res.message || t("error.fetch.fail"));

      const data = await res.json();

      if (data.data.length === 0) {
        setNoMore(true);
        noMoreRef.current = true;
        return;
      }

      setComments((prev) => [...prev, ...data.data]);
      page.current += 1;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [t]);

  // Scroll Handler
  const handleScroll = useCallback(() => {
    const { scrollY, innerHeight } = window;
    const { scrollHeight } = document.documentElement;

    if (
      scrollY + innerHeight >= scrollHeight - SCROLL_THRESHOLD &&
      !loadingRef.current &&
      !noMoreRef.current
    ) {
      loadComments();
    }
  }, [loadComments]);

  // Initial Fetch
  useEffect(() => {
    loadComments();
  }, [loadComments]);

  // Scroll Listener Setup
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center gap-10 p-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-3 rounded-3xl p-10 max-w-4xl bg-emerald-900/60 dark:bg-black/50 text-white shadow-md">
        <h1 className="text-center text-3xl md:text-4xl font-bold mb-4">
          {t("comments.welcome.title")}
        </h1>
        <p className="text-lg">{t("comments.welcome.text")}</p>
        <hr />
        <p className="text-lg">{t("comments.welcome.tip")}</p>
      </div>

      {/* Comments Section */}
      <div className="flex flex-col gap-6 w-full max-w-3xl">
        {/* New Comment Form */}
        {Comment1 && (
          <div ref={formRef}>
            <NewCommentForm reFetchExisting={reFetchExisting} />
          </div>
        )}
        {comments.map((el) => (
          <Comment
            key={el._id}
            el={el}
            reFetchExisting={reFetchExisting}
            formRef={formRef}
            setComment1={setComment1}
          />
        ))}

        {loading && (
          <div className="flex justify-center">
            <MiniLoading />
          </div>
        )}
        {error && <p className="text-red-500">{error.message}</p>}
        {noMore && (
          <div className="text-white flex flex-col gap-3">
            <hr />
            <p className=" text-center text-lg"> {t("comments.comment.end")}</p>
            <hr />
          </div>
        )}
      </div>
      {/* Floating Add Comment Button */}
      <button
        onClick={scrollToForm}
        className="cursor-pointer fixed bottom-4 right-4 p-4 bg-blue-300 text-white rounded-full shadow-lg hover:bg-blue-500 transition"
      >
        <FaPen size={24} />
      </button>
    </div>
  );
}

export default Comments;
