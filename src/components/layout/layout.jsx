import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";

const Layout = () => {
  return (
    <main className="">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
