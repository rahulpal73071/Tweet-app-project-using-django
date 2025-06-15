import { useEffect, useState } from "react";
import { getTweets, deleteTweet } from "../api/tweets";
import TweetCard from "../components/TweetCard";

export default function Home() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username"); // Used to show buttons for own tweets

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      const res = await getTweets();
      setTweets(res.data);
    } catch (err) {
      console.error("Failed to fetch tweets:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTweet = async (id) => {
    try {
      await deleteTweet(id, token);
      setTweets((prev) => prev.filter((tweet) => tweet.id !== id));
    } catch (err) {
      alert("Failed to delete tweet.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-3xl p-6">
        <h1 className="text-4xl font-extrabold text-center text-white mb-6">
          All Tweets 🐦
        </h1>

        {loading ? (
          <p className="text-center text-white/70">Loading tweets...</p>
        ) : tweets.length === 0 ? (
          <p className="text-center text-white/80">No tweets found.</p>
        ) : (
          <div className="space-y-4">
            {tweets.map((tweet) => (
              <TweetCard
                key={tweet.id}
                tweet={tweet}
                onDelete={handleDeleteTweet}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
