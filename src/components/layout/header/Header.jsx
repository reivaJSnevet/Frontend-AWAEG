import { Link } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

const Header = () => {
  return (
<header className="flex justify-between px-1 bg-white border-b shadow-lg">
  <Sidebar />
  <div className="flex items-center">
    <Link to="">
      <img
        src="/logo-removebg-header.webp"
        alt="Image"
        className="object-cover"
      />
    </Link>
  </div>
</header>

  );
};

export default Header;
