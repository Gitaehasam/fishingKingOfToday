import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SocialNaver from "@components/login/SocialNaver";
import SocialKakao from "@components/login/SocialKakao";
import SocialGoogle from "@components/login/SocialGoogle";
import Header from "@components/Header";
import loginImg from "@assets/images/login_img.webp";
import "@assets/styles/login/LoginPage.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevPath = location.state?.path;

  useEffect(() => {
    localStorage.setItem(
      "jwt",
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIzcXE1Ul9ZNGc3VGdFWDhkc0lzVWNDTXlUaU43b0tuc04yNjFrRm91S0swIiwic3ViIjoiIiwiaWF0IjoxNzA4MjE5Njg5LCJleHAiOjE3MTA4MTE2ODl9.FZWKdTrtB9ED-X2IfY6KtDEE-utqTDIBEzkAdZFhM9Y"
    );
    localStorage.setItem(
      "user",
      JSON.stringify({ imageUrl: "https://ssl.pstatic.net/static/pwe/address/img_profile.png", nickname: "존경받는끄리", socialId: "3qq5R_Y4g7TgEX8dsIsUcCMyTiN7oKnsN261kFouKK0" })
    );

    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      navigate("/");
    }
  }, []);

  return (
    <div className="LoginPage">
      {/* <Header prevPath={prevPath} /> */}
      <div className="LoginPage_body">
        <img src={loginImg} alt="" />
      </div>
      <div className="LoginPage_footer">
        <SocialNaver />
        <SocialKakao />
        {/* <SocialGoogle /> */}
      </div>
    </div>
  );
};

export default LoginPage;
