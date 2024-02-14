import { useRef, useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import MarkerOff from "@assets/images/marker_place_off.png";
import MarkerOn from "@assets/images/marker_place.png";
import axios from "axios";

const BoardCreateMap = ({ fishSpot, setFishSpot }) => {
  const [mapCenter, setMapCenter] = useState({
    lat: 36.172823447489336,
    lng: 127.8675122717897,
  });
  const [searchSpot, setSearchSpot] = useState("");
  const [mapLevel, setMapLevel] = useState(13);
  const [fishSpotList, setFishSpotList] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const mapRef = useRef();
  const inputRef = useRef();

  const getSpots = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/spots`,
        {
          params: { keyword: searchSpot },
          headers: { Authorization: localStorage.getItem("jwt") },
        }
      );

      console.log(res.data.spots);

      setFishSpotList(res.data.spots);
      mapRef.current.setLevel(13);
      mapRef.current.setCenter(
        new kakao.maps.LatLng(36.172823447489336, 127.8675122717897)
      );
      inputRef.current.blur();
    } catch (error) {
      console.log(error);
    }
  };

  const dataReset = () => {
    setActiveMarker(null);
    setFishSpot({});
    inputRef.current.blur();
  };

  const addData = (idx, data) => {
    setActiveMarker(idx);
    setFishSpot(data);
  };

  return (
    <div>
      <Map
        center={mapCenter}
        ref={mapRef}
        level={mapLevel} // 지도의 확대 레벨
        onClick={dataReset}
      >
        <MarkerClusterer minLevel={11} averageCenter={true}>
          {fishSpotList.map((spot, idx) => {
            return (
              <MapMarker
                position={{ lat: spot.latitude, lng: spot.longitude }} // 마커를 표시할 위치
                key={spot.spotId}
                onClick={() => addData(idx, spot)}
                image={
                  activeMarker === idx
                    ? {
                        src: MarkerOn,
                        size: { width: 28, height: 40 },
                      }
                    : {
                        src: MarkerOff,
                        size: { width: 18, height: 25 },
                      }
                }
              />
            );
          })}
        </MarkerClusterer>
      </Map>
      <form onSubmit={getSpots}>
        <input
          type="text"
          ref={inputRef}
          value={searchSpot}
          onChange={(e) => setSearchSpot(e.target.value)}
        />
      </form>
      {fishSpot && (
        <div>
          <div>{fishSpot.name}</div>
        </div>
      )}
    </div>
  );
};

export default BoardCreateMap;
