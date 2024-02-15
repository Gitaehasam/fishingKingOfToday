import { useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  activeMarkerAtom,
  centerChangeAtom,
  myCenterAtom,
} from "../../stores/FishingMapStore";
import "@assets/styles/fishmap/FishMapItem.scss";

const FishMapItem = ({ item, idx, mapRef, getDistance, setOpenList }) => {
  const myCenter = useRecoilValue(myCenterAtom);
  const setActiveMarker = useSetRecoilState(activeMarkerAtom);
  const setCenterChange = useSetRecoilState(centerChangeAtom);

  const distance = useMemo(() => {
    return getDistance(
      myCenter.center.lat,
      myCenter.center.lng,
      item.latitude,
      item.longitude
    );
  }, []);

  const handleClick = () => {
    setOpenList(false);
    console.log(item);
    setActiveMarker(item.spotId);
    const locPosition = new kakao.maps.LatLng(item.latitude, item.longitude);
    mapRef.current.setLevel(4);
    mapRef.current.setCenter(locPosition);
    setCenterChange(false);
  };

  return (
    <div className="item">
      <div className="item-head">
        <div className="fishing-name" onClick={handleClick}>
          {item.name}
        </div>
        <div className="fishing-type">{item.spotType}</div>
      </div>
      <div className="item-body">
        <div className="fishing-dist">
          {distance >= 1
            ? `${distance.toFixed(1)}km`
            : `${(distance / 1000).toFixed()}m`}
        </div>
        <div className="fishing-addr">
          {item.streetAddress || item.localAddress}
        </div>
      </div>
      <div className="fishing-exp">{item.charge}원</div>
    </div>
  );
};

export default FishMapItem;
