import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

const Navbar = () => {
  const {
    searchTerm,
    setSearchTerm,
    location,
    setLocation,
  } = useContext(SearchContext);

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    navigate("/jobs");
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    navigate("/jobs");
  };

  return (
    <nav className="bg-white shadow-lg border-white px-6 py-4 flex items-center justify-between h-25">

      {/* Logo */}
      <Link to="/" className="text-3xl font-bold text-blue-600">
        JobBoard
      </Link>

      {/* Search + Location */}
      <div className="hidden md:flex gap-4 w-1/2">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Location..."
          value={location}
          onChange={handleLocationChange}
          className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Links */}
      <div className="space-x-6 text-gray-600 font-medium">
        <Link to="/jobs" className="hover:text-blue-600">
          Jobs
        </Link>
        <Link to="/profile" className="hover:text-blue-600">
          Profile
        </Link>
        <Link to="/admin" className="hover:text-blue-600 text-blue-400">
          Admin Dashboard
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;
