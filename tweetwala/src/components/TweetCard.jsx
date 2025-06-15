import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function TweetCard({ tweet, onDelete }) {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("username"); // Assuming you store username after login

  const handleEdit = () => {
    navigate(`/edit/${tweet.id}`); // You must have this route setup
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this tweet?")) {
      onDelete(tweet.id); // onDelete passed as a prop to handle deletion in parent
    }
  };

  const isAuthor = tweet.user.username === currentUser;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative p-5 rounded-2xl overflow-hidden shadow-xl mb-6 transition-transform hover:scale-105"
    >
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-transparent to-green-400 opacity-30 blur-2xl z-0" />

      {/* Glassmorphic card */}
      <div className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/30 rounded-2xl p-5">
        <h2 className="text-2xl font-semibold text-blue-300 mb-1">{tweet.title}</h2>

        <p className="text-white mb-4">{tweet.content}</p>

        {tweet.image && (
          <img
          src={tweet.image}
          alt="tweet"
          className="rounded-xl w-full max-w-full mb-4 border border-white/20 shadow-md"
          />
        )}

        <p className="text-sm text-white/80 mb-2">@{tweet.user.username}</p>
        <p className="text-xs text-white/70 text-right">
          {new Date(tweet.created_at).toLocaleString()}
        </p>

        {/* Action buttons for the author only */}
        {isAuthor && (
          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={handleEdit}
              className="px-4 py-1 rounded-lg bg-yellow-400 text-black hover:bg-yellow-500 transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
