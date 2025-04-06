// Import modules
import { useState } from "react";
import { useTranslation } from "react-i18next";

function NewReply({ reFetchExisting, commentId, replyId = null }) {
  const { t } = useTranslation();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/replies/${commentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ content, comment: commentId, reply: replyId }),
        }
      );

      if (!res.ok) {
        throw new Error(t("error.fetch.post"));
      }

      setContent("");
      reFetchExisting();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md flex flex-col gap-4"
    >
      <textarea
        className="w-full p-3 rounded-lg resize-none border dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-black dark:placeholder:text-white"
        rows={4}
        placeholder={t("comments.comment.placeholder")}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={loading}
      />

      <div className="flex items-center justify-between">
        {error && <p className="text-red-500 text-sm">{error.message}</p>}
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl disabled:opacity-50"
        >
          {loading ? t("comments.comment.posting") : t("comments.comment.post")}
        </button>
      </div>
    </form>
  );
}

export default NewReply;
