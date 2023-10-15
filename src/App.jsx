import {Routes, Route} from "react-router-dom";
import Layout from "./components/Layout";
import routes from "./routes/routes";

import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";

function App() {

  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
            {routes}
        </Route>   
      </Routes>
    </ChakraProvider>
  );
}

export default App;
