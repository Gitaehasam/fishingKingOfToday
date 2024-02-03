import { useMemo } from "react";
import "@assets/styles/FishMap/FishMapItem.scss";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  activeMarkerAtom,
  centerChangeAtom,
  myCenterAtom,
} from "../../stores/FishingMapStore";

const FishMapItem = ({ item, idx, mapRef, getDistance, setOpenList }) => {
  const myCenter = useRecoilValue(myCenterAtom);
  const setActiveMarker = useSetRecoilState(activeMarkerAtom);
  const setCenterChange = useSetRecoilState(centerChangeAtom);

  const distance = useMemo(() => {
    return getDistance(
      myCenter.center.lat,
      myCenter.center.lng,
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

  console.log(item);

  return (
    <div className="item" onClick={handleClick}>
      <div className="item-head">
        <div className="fishing-name">{item.content.name}</div>
        <div className="fishing-type">{item.content.type}</div>
      </div>
      <div className="item-body">
        <div className="fishing-dist">
          {distance >= 1
            ? `${distance.toFixed(1)}km`
            : `${(distance / 1000).toFixed()}`}
        </div>
        <div className="fishing-addr">{item.content.addr}</div>
      </div>
      <div className="fishing-exp">{item.content.expense}원</div>
    </div>
  );
};

export default FishMapItem;
