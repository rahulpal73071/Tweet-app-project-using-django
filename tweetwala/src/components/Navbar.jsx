import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    alert("Logged out");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-indigo-600 to-green-500 text-white shadow-md p-4">
      <div className="w-full flex justify-between items-center px-4 md:px-8">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold tracking-wide">
            TwitApp
          </Link>
          {token && username && (
            <span className="text-sm md:text-base bg-white/10 px-3 py-1 rounded-full">
              Hello, <span className="font-semibold">{username}</span> 👋
            </span>
          )}
        </div>

        {/* Hamburger for mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-6 text-lg font-medium">
          {token ? (
            <>
              <Link to="/create" className="hover:text-yellow-300 transition duration-200">Create</Link>
              <button onClick={handleLogout} className="hover:text-red-300 transition duration-200">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-300 transition duration-200">Login</Link>
              <Link to="/register" className="hover:text-yellow-300 transition duration-200">Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden mt-3 flex flex-col space-y-3 text-center text-lg font-medium">
          {token ? (
            <>
              <Link to="/create" onClick={() => setIsOpen(false)}>Create</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
