import { useMemo } from "react";
import "../../assets/styles/FishMap/FishMapItem.scss";

const FishMapItem = ({
  item,
  idx,
  myCenter,
  setOpenList,
  mapRef,
  setActiveMarker,
  setCenterChange,
  getDistance,
}) => {
  const distance = useMemo(() => {
    return getDistance(
      myCenter.lat,
      myCenter.lng,
      item.latlng.lat,
      item.latlng.lng
    );
  }, []);

  const handleClick = () => {
    setOpenList(false);
    setActiveMarker(idx);
    const locPosition = new kakao.maps.LatLng(item.latlng.lat, item.latlng.lng);
    mapRef.current.setLevel(4);
    mapRef.current.setCenter(locPosition);
    setCenterChange(false);
  };

  return (
    <div className="item" onClick={handleClick}>
      <div className="item-head">
        <div>{item.content.name}</div>
        <div>{item.content.type}</div>
      </div>
      <div>{item.content.expense}</div>
      <div>
        {distance >= 1
          ? `${distance.toFixed(1)}km`
          : `${(distance / 1000).toFixed()}`}
      </div>
    </div>
  );
};

export default FishMapItem;
