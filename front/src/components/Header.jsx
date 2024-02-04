import "@assets/styles/Header.scss";
import back from "@assets/images/backSymbol.svg";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";

const Header = ({
  size = "8vh",
  centerText,
  rightText,
  RightIcon,
  align = "start",
  color = "black",
  filter = "none",
}) => {
  const navigate = useNavigate();

  const ComponentToRender =
    RightIcon === "InfoOutlinedIcon" ? InfoOutlinedIcon : InfoOutlinedIcon;

  return (
    <header className="header" style={{ height: size, color: color }}>
      <img
        src={back}
        alt=""
        style={{ filter: filter }}
        onClick={() => navigate(-1)}
      />
      <div className="center-text" style={{ justifyContent: align }}>
        {centerText}
      </div>
      {rightText ? (
        <div className="right-text">{rightText}</div>
      ) : RightIcon ? (
        <ComponentToRender />
      ) : (
        <div className="none"></div>
      )}
    </header>
  );
};

export default Header;
