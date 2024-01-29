import { useState } from "react";
import { MapMarker, useMap } from "react-kakao-maps-sdk";
import MarkerOff from "../../assets/images/marker_place_off.png";
import MarkerOn from "../../assets/images/marker_place.png";
import "../../assets/styles/FishMap/EventMarker.scss";
import { IoCall } from "react-icons/io5";
import { FaShareSquare } from "react-icons/fa";

const EventMarker = ({ position, content, isActive, onClick }) => {
  const map = useMap();

  const handleClick = (marker) => {
    map.panTo(marker.getPosition());
    onClick();
  };

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
            <div className="info_name">{content.name}</div>
            <div className="info_type">{content.type}</div>
          </div>
          <div className="info_body">
            <div className="info_distance">{content.distance}</div>
            <div className="info_addr">{content.addr}</div>
          </div>
          <div className="info_footer">
            <hr />
            <div className="info_icons">
              {content.tel && <IoCall />}
              <FaShareSquare />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventMarker;
