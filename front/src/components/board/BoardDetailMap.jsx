import { Map, MapMarker } from "react-kakao-maps-sdk";
import MarkerOn from "@assets/images/marker_place.webp";

const BoardDetailMap = ({ lat, lng }) => {
  return (
    <Map
      center={{
        lat: lat,
        lng: lng,
      }}
      draggable={false}
      zoomable={false}
      level={10} // 지도의 확대 레벨
    >
      <MapMarker
        position={{ lat, lng }} // 마커를 표시할 위치
        image={{
          src: MarkerOn,
          size: { width: 28, height: 40 },
        }}
      />
    </Map>
  );
};

export default BoardDetailMap;
