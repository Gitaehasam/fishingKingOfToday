import { useMemo } from "react";
import "../../assets/styles/FishMap/FishMapItem.scss";

const FishMapItem = ({
  item,
  idx,
  myCenter,
  setIsIs,
  setActiveMarker,
  setCenterChange,
  getDistanceFromLatLonInKm,
}) => {
  const distance = useMemo(() => {
    return getDistanceFromLatLonInKm(
      myCenter.lat,
      myCenter.lng,
      item.latlng.lat,
      item.latlng.lng
    );
  }, []);

  return (
    <div
      className="item"
      onClick={() => {
        setIsIs(false);
        setActiveMarker(idx);
        const locPosition = new kakao.maps.LatLng(
          item.latlng.lat,
          item.latlng.lng
        );
        mapRef.current.setLevel(4);
        mapRef.current.setCenter(locPosition);
        setCenterChange(false);
      }}
    >
      <div>{item.content.name}</div>
      <div>{item.content.type}</div>
      <div>
        {distance >= 1
          ? `${distance.toFixed(1)}km`
          : `${(distance / 1000).toFixed()}`}
      </div>
    </div>
  );
};

export default FishMapItem;
