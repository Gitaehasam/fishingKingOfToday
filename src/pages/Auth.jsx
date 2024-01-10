import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Auth = () => {
  const { id } = useParams();

  const params = new URL(document.URL).searchParams;
  const code = params.get("code");

  const navigate = useNavigate();

  useEffect(() => {
    console.log(id);
    console.log(code);
    // navigate("/");
  }, []);

  return <div>{code}</div>;
};

export default Auth;
