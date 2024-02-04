import back from "../assets/images/backSymbol.svg";
import loginImg from "../assets/images/login_img.png";
import { useNavigate } from "react-router-dom";
import "../assets/styles/login/LoginPage.scss";
import SocialNaver from "../components/login/SocialNaver";
import SocialKakao from "../components/login/SocialKakao";
import SocialGoogle from "../components/login/SocialGoogle";
import Header from "../components/Header";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="LoginPage">
      <Header centerText={"Login"} />
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
