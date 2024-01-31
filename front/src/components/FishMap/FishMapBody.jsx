import { Map, MapMarker } from "react-kakao-maps-sdk";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import EventMarker from "./EventMarker";
import { IoMdRefresh } from "react-icons/io";
import "../../assets/styles/FishMap/FishMapBody.scss";

const FishMapBody = ({
  centerChange,
  mapRef,
  handleClickMarker,
  setCenterChange,
  ddd,
  state,
  setIsOpen,
  isOpen,
  isIs,
  activeMarker,
  setActiveMarker,
  handleClick,
  getInfo,
  getDistanceFromLatLonInKm,
}) => {
  return (
    <div className="FishMapBody">
      {centerChange && !isIs && (
        <div className="reSearch" onClick={getInfo}>
          <IoMdRefresh />이 지역 검색
        </div>
      )}
      <Map // 지도를 표시할 Container
        center={state.center}
        ref={mapRef}
        level={10} // 지도의 확대 레벨
        onClick={handleClickMarker}
        onCenterChanged={() => setCenterChange(true)}
      >
        {ddd.map((value, index) => (
          <EventMarker
            key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
            position={value.latlng}
            content={value.content}
            isActive={activeMarker === index}
            onClick={() => setActiveMarker(index)}
            state={state.center}
            getDistanceFromLatLonInKm={getDistanceFromLatLonInKm}
          />
        ))}
        {state.isLoading && (
          <MapMarker
            position={state.center}
            clickable={true}
            onClick={() => setIsOpen(true)}
            image={{
              src: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
              size: { width: 30, height: 30 },
              // options: {
              //   offset: {
              //     x: 15,
              //     y: 0,
              //   },
              // },
            }}
          >
            {isOpen && (
              <div style={{ padding: "5px", color: "#000" }}>
                {state.errMsg ? state.errMsg : "여기에 계신가요?!"}
              </div>
            )}
          </MapMarker>
        )}

        {!isIs && (
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
