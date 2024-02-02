import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import EventMarker from "./EventMarker";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import "../../assets/styles/FishMap/FishMapBody.scss";

const FishMapBody = ({
  centerChange,
  mapRef,
  handleClickMarker,
  setCenterChange,
  addData,
  myCenter,
  openList,
  activeMarker,
  setActiveMarker,
  handleClick,
  getInfo,
  getDistance,
}) => {
  return (
    <div className="FishMapBody">
      {centerChange && !openList && (
        <div className="reSearch" onClick={getInfo}>
          <RefreshOutlinedIcon />이 지역 검색
        </div>
      )}
      <Map // 지도를 표시할 Container
        center={myCenter.center}
        ref={mapRef}
        level={9} // 지도의 확대 레벨
        onClick={handleClickMarker}
        onCenterChanged={() => setCenterChange(true)}
      >
        <MarkerClusterer minLevel={12} averageCenter={true}>
          {addData.map((value, index) => (
            <EventMarker
              key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
              position={value.latlng}
              content={value.content}
              isActive={activeMarker === index}
              onClick={() => setActiveMarker(index)}
              state={myCenter.center}
              getDistance={getDistance}
            />
          ))}
        </MarkerClusterer>
        {myCenter.isLoading && (
          <MapMarker
            position={myCenter.center}
            clickable={true}
            image={{
              src: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
              size: { width: 25, height: 25 },
            }}
          />
        )}

        {!openList && (
          <button
            style={{ bottom: activeMarker !== null ? "180px" : "20px" }}
            className="FishMap_btn"
            onClick={handleClick}
          >
            <GpsFixedIcon />
          </button>
        )}
      </Map>
    </div>
  );
};

export default FishMapBody;
