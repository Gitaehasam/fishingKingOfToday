import { useRef } from "react";
import "./Login.css";
import kakao_logo from "../assets/images/kakao_logo.png";
import naver_logo from "../assets/images/naver_logo.png";
import google_logo from "../assets/images/google_logo.png";

const Login = () => {
  const dialogRef = useRef();

  const closeModal = (e) => {
    const target = e.target;
    const rect = target.getBoundingClientRect();
    if (
      rect.left > e.clientX ||
      rect.right < e.clientX ||
      rect.top > e.clientY ||
      rect.bottom < e.clientY
    ) {
      dialogRef.current.close();
    }
  };

  return (
    <>
      <button onClick={() => dialogRef.current.showModal()}>로그인</button>
      <dialog ref={dialogRef} onClick={closeModal}>
        <div>
          <div className="header-modal">
            <div className="title-modal">
              로그인 후 <span>이용이</span> <span>가능합니다.</span>
            </div>
            <form method="dialog">
              <button className="close-modal">둘러보기 →</button>
            </form>
          </div>
          <div className="footer-modal">
            <div className="login-logo">
              <img src={kakao_logo} alt="카카오로그인" />
              <img src={naver_logo} alt="네이버로그인" />
              <img src={google_logo} alt="구글로그인" />
            </div>
            <div className="explain-modal">
              회원가입 없이 소셜 계정을 통해 바로 이용 가능하며 첫 로그인시{" "}
              <span>이용약관</span> 및 <span>개인정보처리방침</span> 동의로
              간주됩니다.
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Login;
