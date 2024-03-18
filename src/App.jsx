import { Routes } from "react-router-dom";
import routes from "./routes/MyRoutes.jsx";

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
