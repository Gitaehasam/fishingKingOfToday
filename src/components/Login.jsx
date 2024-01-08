import { useRef } from "react";
import "./Login.css";

const Login = () => {
  const dialogRef = useRef();

  return (
    <div>
      <button onClick={() => dialogRef.current.showModal()}>로그인</button>
      <dialog
        ref={dialogRef}
        onClick={(e) => {
          console.log(e);
        }}
      >
        <form method="dialog">
          <button>Close</button>
        </form>
        로그인 후 이용이 가능합니다.
      </dialog>
    </div>
  );
};

export default Login;
