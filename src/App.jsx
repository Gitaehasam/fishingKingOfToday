import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/css/App.scss";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Auth from "./pages/Auth";
import SocialNaver from "./components/SocialNaver";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/:id" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
