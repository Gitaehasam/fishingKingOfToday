import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapMarker, useMap } from "react-kakao-maps-sdk";
import MarkerOff from "../../assets/images/marker_place_off.png";
import MarkerOn from "../../assets/images/marker_place.png";
import { FaShareSquare } from "react-icons/fa";
import CallIcon from "@mui/icons-material/Call";
import "../../assets/styles/FishMap/EventMarker.scss";

const EventMarker = ({
  position,
  content,
  isActive,
  onClick,
  getDistance,
  state,
}) => {
  const map = useMap();
  const navigate = useNavigate();

  const handleClick = (marker) => {
    map.panTo(marker.getPosition());
    onClick();
  };

  const distance = useMemo(() => {
    return getDistance(state.lat, state.lng, position.lat, position.lng);
  }, []);

  // map.addListener("click", () => {
  //   setIsVisible(false);
  // });

  return (
    <>
      <MapMarker
        position={position} // 마커를 표시할 위치
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
            <div
              className="info_name"
              onClick={() =>
                navigate(`${position.lat}-${position.lng}`, {
                  state: { data: { content, position } },
                })
              }
            >
              {content.name}
            </div>
            <div className="info_type">{content.type}</div>
          </div>
          <div className="info_body">
            <div className="info_distance">
              {distance >= 1
                ? `${distance.toFixed(1)}km`
                : `${(distance / 1000).toFixed()}`}
            </div>
            <div className="info_addr">{content.addr}</div>
          </div>
          <div className="info_footer">
            <hr />
            <div className="info_icons">
              {content.tel && <CallIcon />}
              <FaShareSquare />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventMarker;
