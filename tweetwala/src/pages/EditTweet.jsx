import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditTweet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [image, setImage] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/twits/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setFormData({ title: res.data.title, content: res.data.content });
        setExistingImageUrl(res.data.image);
      })
      .catch((err) => console.error("Failed to fetch tweet:", err));
  }, [id, token]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", formData.title);
    form.append("content", formData.content);
    if (image) {
      form.append("image", image);
    }

    axios
      .put(`http://localhost:8000/api/twits/${id}/`, form, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error("Failed to update tweet:", err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 pt-24 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white/10 border border-white/20 backdrop-blur-md p-8 rounded-3xl shadow-lg text-white"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold mb-6 text-center tracking-wide">Edit Tweet ✏️</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-sm">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Edit title..."
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-sm">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Update your content..."
            rows="5"
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />
        </div>

        {existingImageUrl && (
          <div className="mb-4">
            <p className="text-sm font-semibold mb-1">Current Image:</p>
            <img
              src={existingImageUrl}
              alt="Current"
              className="rounded-lg w-full max-h-60 object-contain border border-white/30"
            />
          </div>
        )}

        <div className="mb-6">
          <label className="block mb-1 font-medium text-sm">Change Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 text-white bg-white/10 border border-white/30 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300"
        >
          Update Tweet ✅
        </button>
      </form>
    </div>
  );
}
