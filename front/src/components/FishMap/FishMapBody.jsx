import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import EventMarker from "./EventMarker";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  activeMarkerAtom,
  centerChangeAtom,
  filterModeAtom,
  fishSpotListAtom,
  mapCenterAtom,
  mapLevelAtom,
  myCenterAtom,
} from "../../stores/FishingMapStore";
import axios from "axios";
import "@assets/styles/fishmap/FishMapBody.scss";

const FishMapBody = ({ mapRef, getDistance, openList }) => {
  const [centerChange, setCenterChange] = useRecoilState(centerChangeAtom);
  const [activeMarker, setActiveMarker] = useRecoilState(activeMarkerAtom);
  const [myCenter, setMyCenter] = useRecoilState(myCenterAtom);
  const [mapCenter, setMapCenter] = useRecoilState(mapCenterAtom);
  const [fishSpotList, setFishSpotList] = useRecoilState(fishSpotListAtom);
  const mapLevel = useRecoilValue(mapLevelAtom);
  const setFilterMode = useSetRecoilState(filterModeAtom);

  // 지도 중심
  const getInfo = async () => {
    const map = mapRef.current;
    if (!map) return;

    const center = map.getCenter();

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/spots`,
        {
          params: { latitude: center.getLat(), longitude: center.getLng() },
        }
      );

      const data = res.data.spots
        .map((item) => {
          const dist = getDistance(
            center.getLat(),
            center.getLng(),
            item?.latitude,
            item?.longitude
          );
          return dist <= 20 ? { ...item, dist: dist } : null;
        })
        .filter(Boolean);

      setFishSpotList(data);

      map.setCenter(center);
      setCenterChange(false);
      setActiveMarker(null);
      setFilterMode("dist");
      setMapCenter({
        lat: center.getLat(),
        lng: center.getLng(),
      });
    } catch (error) {
      console.log(error);
    }
  };

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
        level={mapLevel} // 지도의 확대 레벨
        onClick={() => setActiveMarker(null)}
        onCenterChanged={() => setCenterChange(true)}
      >
        <MarkerClusterer minLevel={11} averageCenter={true}>
          {fishSpotList.map((value, index) => (
            <EventMarker
              key={value.spotId}
              value={value}
              isActive={activeMarker === value.spotId}
              onClick={() => setActiveMarker(value.spotId)}
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
            className="FishMap_btn bg-blue"
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
