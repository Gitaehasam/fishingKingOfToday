import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import EventMarker from "./EventMarker";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import "../../assets/styles/fishmap/FishMapBody.scss";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  activeMarkerAtom,
  centerChangeAtom,
  filterModeAtom,
  mapCenterAtom,
  myCenterAtom,
} from "../../stores/FishingMapStore";

const FishMapBody = ({ mapRef, addData, getDistance, openList }) => {
  const [centerChange, setCenterChange] = useRecoilState(centerChangeAtom);
  const [activeMarker, setActiveMarker] = useRecoilState(activeMarkerAtom);
  const [myCenter, setMyCenter] = useRecoilState(myCenterAtom);
  const [mapCenter, setMapCenter] = useRecoilState(mapCenterAtom);
  const setFilterMode = useSetRecoilState(filterModeAtom);

  const getInfo = () => {
    const map = mapRef.current;
    if (!map) return;

    const center = map.getCenter();

    map.setCenter(center);
    setCenterChange(false);
    setActiveMarker(null);
    setFilterMode("dist");

    setMapCenter({
      lat: center.getLat(),
      lng: center.getLng(),
    });
  };

  console.log(mapCenter);

  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const locPosition = new kakao.maps.LatLng(lat, lng);
        mapRef.current.setCenter(locPosition);
        setCenterChange(false);
        setMyCenter((prev) => ({
          ...prev,
          center: {
            lat: lat, // 위도
            lng: lng, // 경도
          },
          isLoading: true,
        }));
      });
    } else {
      window.alert("이 브라우저에서는 Geolocation을 지원하지 않습니다.");
    }
  };

  return (
    <div className="FishMapBody">
      {centerChange && !openList && (
        <div className="reSearch" onClick={getInfo}>
          <RefreshOutlinedIcon />이 지역 검색
        </div>
      )}
      <Map // 지도를 표시할 Container
        center={mapCenter}
        ref={mapRef}
        level={9} // 지도의 확대 레벨
        onClick={() => setActiveMarker(null)}
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
            style={{ bottom: activeMarker !== null ? "19vh" : "3vh" }}
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
