import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "../components/Slider";
import logo from "../assets/images/Logo.svg";
import { IoBookOutline } from "react-icons/io5";
import PhishingIcon from "@mui/icons-material/Phishing";
import "../assets/styles/HomePage.scss";

function HomePage() {
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
          <img src={logo} alt="logo" />
          <Link to="/fishbook" aria-label="어종도감 이동">
            <IoBookOutline />
          </Link>
          <Link to="/tutorial" aria-label="튜토리얼 도감">
            <IoBookOutline />
          </Link>
          <Link to="/chatbot" aria-label="챗봇 이동">
            <PhishingIcon />
          </Link>
        </div>
        <Slider setBack={setBack} />
      </div>
    </>
  );
}

export default HomePage;
