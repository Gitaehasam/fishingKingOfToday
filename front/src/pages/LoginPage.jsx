import back from "../assets/images/backSymbol.svg";
import loginImg from "../assets/images/login_img.png";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/login/LoginPage.scss";
import SocialNaver from "../components/login/SocialNaver";
import SocialKakao from "../components/login/SocialKakao";
import SocialGoogle from "../components/login/SocialGoogle";
import Header from "../components/Header";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevPath = location.state?.path;
  const isLogin = sessionStorage.getItem("jwt");

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, []);

  return (
    <div className="LoginPage">
      <Header prevPath={prevPath} />
      {/* <div className="LoginPage_header">
        <img src={back} alt="" onClick={() => navigate("/")} />
        <span>Login</span>
      </div> */}
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
