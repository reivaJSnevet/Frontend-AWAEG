import { BrowserRouter as Router } from "react-router-dom";
import MyRoutes from "./routes/MyRoutes";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <MyRoutes />
      </Router>
    </div>
  );
}

export default App;

