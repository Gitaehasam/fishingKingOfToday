import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapMarker, useMap } from "react-kakao-maps-sdk";
import MarkerOff from "../../assets/images/marker_place_off.png";
import MarkerOn from "../../assets/images/marker_place.png";
import { FaShareSquare } from "react-icons/fa";
import CallIcon from "@mui/icons-material/Call";
import "../../assets/styles/fishmap/EventMarker.scss";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  mapCenterAtom,
  mapLevelAtom,
  myCenterAtom,
} from "../../stores/FishingMapStore";

const EventMarker = ({ value, isActive, onClick, getDistance }) => {
  const myCenter = useRecoilValue(myCenterAtom);
  const setMapCenter = useSetRecoilState(mapCenterAtom);
  const setMapLevel = useSetRecoilState(mapLevelAtom);

  const map = useMap();
  const navigate = useNavigate();

  const handleClick = (marker) => {
    map.panTo(marker.getPosition());
    onClick();
  };

  const distance = useMemo(() => {
    return getDistance(
      myCenter.center.lat,
      myCenter.center.lng,
      value.latitude,
      value.longitude
    );
  }, [myCenter, value]);

  const goDetail = () => {
    const get = map.getCenter();
    setMapCenter({
      lat: get.getLat(),
      lng: get.getLng(),
    });
    setMapLevel(map.getLevel());
    navigate(`/fish/map/${value.spotId}`);
  };

  return (
    <>
      <MapMarker
        position={{ lat: value.latitude, lng: value.longitude }} // 마커를 표시할 위치
        onClick={handleClick}
        image={
          isActive
            ? {
                src: MarkerOn,
                size: { width: 28, height: 40 },
              }
            : {
                src: MarkerOff,
                size: { width: 18, height: 25 },
              }
        }
      ></MapMarker>
      {isActive && (
        <div className="info">
          <div className="info_header">
            <div className="info_name" onClick={goDetail}>
              {value.name}
            </div>
            <div className="info_type">{value.spotType}</div>
          </div>
          <div className="info_body">
            <div className="info_distance">
              {distance >= 1
                ? `${distance.toFixed(1)}km`
                : `${(distance / 1000).toFixed()}`}
            </div>
            <div className="info_addr">{value.streetAddress}</div>
          </div>
          <div className="info_footer">
            <hr />
            <div className="info_icons">
              {value.spotPhone && (
                <a href={`tel:${value.spotPhone}`}>
                  <CallIcon />
                </a>
              )}
              <FaShareSquare />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventMarker;
