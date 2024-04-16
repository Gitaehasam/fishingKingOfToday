import "@assets/styles/Header.scss";
import back from "@assets/images/backSymbol.svg";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

const Header = memo(
  ({
    centerText,
    align = "start",
    filter = "none",
    prevPath = -1,
    headerColor = "white",
  }) => {
    const navigate = useNavigate();

    const handleClick = () =>
      navigate(prevPath, { state: prevPath !== -1 && { data: prevPath } });

    return (
      <header className="header" style={{ background: headerColor }}>
        <img
          src={back}
          alt="Back Icon"
          style={{ filter }}
          onClick={handleClick}
        />
        <div className="center-text" style={{ justifyContent: align }}>
          {centerText}
        </div>
        <div className="header-none"></div>
      </header>
    );
  }
);

export default Header;
