import { Routes, Route } from "react-router-dom";
import routes from "./routes/MyRoutes.jsx";
import Layout from "./components/layout/layout.jsx";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Layout />}> */}
      {routes}
      {/* </Route> */}
    </Routes>
  );
}

export default App;
