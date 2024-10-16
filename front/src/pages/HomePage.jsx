import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "@components/Slider";
import logo from "@assets/images/Logo.svg";
import fish_king_face from "@assets/images/fish_king_face.webp";
import "@assets/styles/HomePage.scss";

const HomePage = () => {
  const [idx, setIdx] = useState(0);
  const navigate = useNavigate();

  const setBack = (num) => setIdx(num);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className={`home slider${idx}`}>
        <div className="Home_header">
          <img src={logo} alt="logo" className="home-logo" />
          <Link to="/chatbot" aria-label="챗봇 이동">
            <img src={fish_king_face} className="chatbot-icon" alt="" />
          </Link>
        </div>
        <Slider setBack={setBack} />
      </div>
    </>
  );
};

export default HomePage;
