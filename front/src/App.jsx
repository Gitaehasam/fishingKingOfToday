import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import "./assets/css/App.scss";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Auth from "./pages/Auth";

export const AuthContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/:social" element={<Auth />} />
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
