import About from "./components/About";
import Footer from "./components/Footer";
import Information from "./components/Information";
import Introduction from "./components/Introduction";
import Location from "./components/Location";
import NavbarH from "./components/NavbarH";

const Home = () => {
    return (
        <>
            <NavbarH />
            <Introduction />
            <About />
            <Information />
            <Location />
            <Footer />
        </>
    );
};

export default Home;
