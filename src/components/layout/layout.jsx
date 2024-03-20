import { Outlet } from "react-router-dom";
/* import Footer from "./footer/Footer"; */
import Footer from "../../pages/home/components/Footer";
import Header from "./header/Header";

const Layout = () => {
    return (
        <main className="grid grid-rows-[auto,1fr,auto] h-screen">
            <Header className="row-span-1" />
            <Outlet className="row-span-2" />
            <Footer className="row-span-1" />
        </main>
    );
};

export default Layout;
