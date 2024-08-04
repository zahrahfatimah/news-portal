import { Link } from "react-router-dom";

export default function Nav() {

  return (
    <nav className="bg-[#CADABF] p-4">
      <div className="flex justify-between items-center">
        <Link
          to="/home"
          className="px-4 py-2 text-black hover:bg-[#BC9F8B] cursor-pointer"
        >
          <span className="text-gray-700 font-mono text-3xl">NewsStation</span>
        </Link>
      </div>
    </nav>
  );
}
