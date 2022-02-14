import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
