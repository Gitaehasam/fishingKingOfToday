import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SocialNaver from "../components/login/SocialNaver";
import SocialKakao from "../components/login/SocialKakao";
import SocialGoogle from "../components/login/SocialGoogle";
import Header from "../components/Header";
import loginImg from "../assets/images/login_img.png";
import "../assets/styles/login/LoginPage.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevPath = location.state?.path;

  useEffect(() => {
    // localStorage.setItem(
    //   "jwt",
    //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIzMjgxMDc5MDMwIiwic3ViIjoiIiwiaWF0IjoxNzA3ODI1NDQxLCJleHAiOjE3MTA0MTc0NDF9.XiP53pnAryUN9F4ISM3JiZQGst_UsUNQWZgEQOHqcvE"
    // );
    // localStorage.setItem(
    //   "user",
    //   JSON.stringify({ imageUrl: null, nickname: "훌륭한붕어" })
    // );

    // const jwt = localStorage.getItem("jwt");

    if (jwt) {
      navigate("/");
    }
  }, []);

  return (
    <div className="LoginPage">
      <Header prevPath={prevPath} />
      <div className="LoginPage_body">
        <img src={loginImg} alt="" />
      </div>
      <div className="LoginPage_footer">
        <SocialNaver />
        <SocialKakao />
        <SocialGoogle />
      </div>
    </div>
  );
};

export default LoginPage;
