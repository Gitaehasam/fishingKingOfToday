import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "@assets/styles/Login/Auth.scss";
import axios from "axios";
import Loading from "../components/Loading";
// import useAuthStore from "../stores/authState";

const AuthPage = () => {
  const { social } = useParams();

  const params = new URL(document.URL).searchParams;
  const code = params.get("code");
  const navigate = useNavigate();

  if (!code) {
    navigate("/");
  }

  const getToken = async () => {
    console.log(code);
    console.log(social);
    console.log(import.meta.env.VITE_BASE_URL);
    // sessionStorage.setItem("jwt", "jwt");
    // logIn();
    // navigate("/", { replace: true });
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login/${social}`,
        {
          code: code,
        }
      );
      const data = res.data.accessToken;
      sessionStorage.setItem("jwt", data);
      navigate("/", { replace: true });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getToken();
    // console.log(code);
    // sessionStorage.setItem("jwt", code);
    // navigate("/", { replace: true });
  }, []);

  return (
    <Loading />
    // <div className="main">
    //   <div className="loading">
    //     <div className="loading-dot"></div>
    //     <div className="loading-dot"></div>
    //     <div className="loading-dot"></div>
    //     <div className="loading-dot"></div>
    //   </div>
    // </div>
  );
};

export default AuthPage;
