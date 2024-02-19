import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "@components/Loading";
import "@assets/styles/login/Auth.scss";

const AuthPage = () => {
  const { social } = useParams();
  const params = new URL(document.URL).searchParams;
  const code = params.get("code");
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  if (!code) {
    navigate("/");
  }

  const getToken = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/login/${social}`, {
        code: code,
      });
      const data = res.data.accessToken;
      const user = await axios.get(`${BASE_URL}/api/users`, {
        headers: {
          Authorization: data,
        },
      });
      localStorage.setItem("jwt", data);
      localStorage.setItem(
        "user",
        JSON.stringify({
          socialId: res.data.socialId,
          imageUrl: user.data.imageUrl,
          nickname: user.data.nickname,
        })
      );

      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
      // navigate("/login", { state: { path: "/" } }, { replace: true });
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return <Loading />;
};

export default AuthPage;
