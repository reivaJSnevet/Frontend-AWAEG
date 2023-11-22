import { Link} from "react-router-dom";

const Header= () => {
  return (
    <header className="h-[10vh] md:[7vh] border-b bg-slate-200 px-1 flex justify-end shadow-lg">
     <div className="">
          <Link to="">
            <img
              src="/logo-removebg-preview.png"
              alt="Image"
              style={{ width: "100px", height: "auto" }}
            />
          </Link>
        </div>
    </header>
  );
}

export default Header;