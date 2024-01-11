import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/css/Auth.scss";

const Auth = () => {
  const { id } = useParams();

  const params = new URL(document.URL).searchParams;
  const code = params.get("code");
  const navigate = useNavigate();

  if (!code) {
    navigate("/");
  }

  useEffect(() => {
    navigate("/");
  }, []);

  return (
    <div class="main">
      <div class="loading">
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
      </div>
    </div>
  );
};

export default Auth;
