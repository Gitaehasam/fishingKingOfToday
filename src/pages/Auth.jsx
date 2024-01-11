import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/css/Auth.scss";
import axios from "axios";

const Auth = () => {
  const { social } = useParams();

  const params = new URL(document.URL).searchParams;
  const code = params.get("code");
  const navigate = useNavigate();

  if (!code) {
    // navigate("/");
  }

  const getToken = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/login/${social}`, {
        code: code,
      });
      const data = res.data.accessToken;
      console.log(data);
      // sessionStorage.setItem("token", data);
      // navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div className="main">
      <div className="loading">
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
    </div>
  );
};

export default Auth;
