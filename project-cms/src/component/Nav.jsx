import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <nav className="bg-[#CADABF] p-4">
      <div className="flex justify-between items-center">
        <Link
          to="/home"
          className="px-4 py-2 text-black hover:bg-[#BC9F8B] cursor-pointer"
        >
          <span className="text-gray-700 font-mono text-3xl">NewsStation</span>
        </Link>
        <div className="flex space-x-4">
          {/* <Link
            to="/login"
            className="px-4 py-2 text-black hover:bg-[#BC9F8B] cursor-pointer"
          >
            <span className="text-gray-700 text-text-xl">Login</span>
          </Link> */}
          <Link
            to="/addUser"
            className="px-4 py-2 text-black hover:bg-[#BC9F8B] cursor-pointer"
          >
            <span className="text-gray-700 text-text-xl">+ User</span>
          </Link>
          <Link
            to="/add"
            className="px-4 py-2 text-black hover:bg-[#BC9F8B] cursor-pointer"
          >
            <span className="text-gray-700 text-text-xl">+ Article</span>
          </Link>
          <Link
            to="/categories"
            className="px-4 py-2 text-black hover:bg-[#BC9F8B] cursor-pointer"
          >
            <span className="text-gray-700 text-text-xl">Read Categories</span>
          </Link>
          <a
            onClick={handleLogout}
            className="px-4 py-2 text-black hover:bg-[#BC9F8B] cursor-pointer"
          >
            <span className="text-gray-700 text-text-xl">Log Out</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
