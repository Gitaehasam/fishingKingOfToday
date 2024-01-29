import { useCallback, useState } from "react";
import "../../assets/styles/Login/NoneLogin.scss";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";

const NoneLogin = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <div className="login-btn" onClick={handleOpen}>
        마이
      </div>
      {isOpen && (
        <div className="NoneLogin_open">
          <div className="NoneLogin_header">
            <span>해당 기능을 이용하시려면</span>
            <span>로그인이 필요합니다!</span>
          </div>
          <div className="NoneLogin_footer">
            <Carousel />
            <div className="NoneLogin_footer_btn">
              <Link to={"/login"} onClick={handleClose}>
                로그인 하기
              </Link>
              <div>|</div>
              <button onClick={handleClose}>나중에 하기</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoneLogin;
