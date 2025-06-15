import { useState } from "react";
import { createTweet } from "../api/tweets";
import { useNavigate } from "react-router-dom";

export default function CreateTweet() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate(); // ✅ correctly added
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      await createTweet(formData, token);
      setTitle("");
      setContent("");
      setImage(null);
      navigate("/"); // ✅ navigate after successful post
    } catch (err) {
      console.error("Tweet creation failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#1e3c72] flex items-center justify-center p-4 pt-24">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white/10 border border-white/20 backdrop-blur-md p-8 rounded-3xl shadow-lg text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center tracking-wide">Create a Tweet 📝</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-sm">Title</label>
          <input
            type="text"
            placeholder="What's the title?"
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-sm">Content</label>
          <textarea
            placeholder="Write something amazing..."
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-sm">Upload Image</label>
          <input
            type="file"
            className="block w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-cyan-500 file:text-white hover:file:bg-cyan-600 transition"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300"
        >
          Post Tweet 🚀
        </button>
      </form>
    </div>
  );
}
