import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Noticia from "./pages/Noticia";

function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/noticia/:id" element={<Noticia />} />
      </Routes>
    </Router>
  );
}

export default Root;
