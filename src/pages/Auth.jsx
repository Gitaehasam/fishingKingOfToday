import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const params = new URL(document.URL).searchParams;
  const code = params.get("code");

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return <div>{code}</div>;
};

export default Auth;
