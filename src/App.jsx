import { BrowserRouter as Router } from "react-router-dom";
import MyRoutes from "./routes/MyRoutes";
// import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <MyRoutes />
      </Router>
      </ChakraProvider>
  );
}

export default App;