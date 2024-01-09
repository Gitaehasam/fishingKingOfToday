import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/css/App.scss";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Auth from "./pages/Auth";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
