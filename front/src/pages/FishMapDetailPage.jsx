import { useLocation, useNavigate } from "react-router-dom";
import MapDetailWeather from "../components/FishMap/MapDetailWeather";
import back from "../assets/images/backSymbol.svg";
import "../assets/styles/FishMap/FishMapDetailPage.scss";

const FishMapDetailPage = () => {
  const location = useLocation();
  const { content, position } = location.state.data;
  console.log(content, position);
  const navigate = useNavigate();

  return (
    <div className="FishMapDetailPage">
      <div className="header">
        <img src={back} alt="back button" onClick={() => navigate(-1)} />
      </div>
      <div className="body">
        <h2 className="name">{content.name}</h2>
        <div className="content">
          <div>
            {content.type}
            <span>•</span>
            {content.addr}
          </div>
          <MapDetailWeather />
        </div>
      </div>
    </div>
  );
};

export default FishMapDetailPage;
