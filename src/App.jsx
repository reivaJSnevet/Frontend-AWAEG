import {Routes, Route} from "react-router-dom";
import Layout from "./components/Layout";
import routes from "./routes/routes";

import "./App.css";

function App() {

  return (
    <Routes>
        <Route path="/" element={<Layout />}>
            {routes}
        </Route>   
    </Routes>
  );
}

export default App;
