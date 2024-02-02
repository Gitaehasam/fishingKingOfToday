import "@assets/styles/Header.scss";
import back from "@assets/images/backSymbol.svg";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import { height } from "@mui/system";

const Header = ({
  size = "8vh",
  centerText,
  rightText,
  RightIcon,
  align = "start",
}) => {
  const navigate = useNavigate();

  const ComponentToRender =
    RightIcon === "InfoOutlinedIcon" ? InfoOutlinedIcon : InfoOutlinedIcon;

  return (
    <header className="header" style={{ height: size }}>
      <img src={back} alt="" onClick={() => navigate(-1)} />
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
