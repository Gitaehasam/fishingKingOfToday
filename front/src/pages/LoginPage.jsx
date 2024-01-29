import back from "../assets/images/backSymbol.svg";
import loginImg from "../assets/images/login_img.png";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Login/LoginPage.scss";
import SocialNaver from "../components/Login/SocialNaver";
import SocialKakao from "../components/Login/SocialKakao";
import SocialGoogle from "../components/Login/SocialGoogle";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="LoginPage">
      <div className="LoginPage_header" onClick={() => navigate("/")}>
        <img src={back} alt="" />
        <span>Login</span>
      </div>
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
