import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import FishMapHeader from "../components/fishmap/FishMapHeader";
import FishMapBody from "../components/fishmap/FishMapBody";
import FishMapFooter from "../components/fishmap/FishMapFooter";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { activeMarkerAtom } from "@/stores/FishingMapStore.js";
import {
  centerChangeAtom,
  filterModeAtom,
  fishSpotListAtom,
  mapCenterAtom,
  mapLevelAtom,
  myCenterAtom,
  searchModeAtom,
  searchTermAtom,
} from "../stores/FishingMapStore";
import axios from "axios";
import "@assets/styles/fishmap/FishMapPage.scss";

const hashTags = [
  "#사진맛집",
  "#노을맛집",
  "#월척",
  "#고기맛집",
  "#산책하기좋은곳",
];

const FishMapPage = () => {
  const setSearchTerm = useSetRecoilState(searchTermAtom);
  const setFilterModeAtom = useSetRecoilState(filterModeAtom);
  const setCenterChange = useSetRecoilState(centerChangeAtom);
  const setMyCenter = useSetRecoilState(myCenterAtom);
  const setFishSpotList = useSetRecoilState(fishSpotListAtom);
  const setSearchMode = useSetRecoilState(searchModeAtom);
  const setMapLevel = useSetRecoilState(mapLevelAtom);
  const [mapCenter, setMapCenter] = useRecoilState(mapCenterAtom);
  const [activeMarker, setActiveMarker] = useRecoilState(activeMarkerAtom); // 활성화 마커 인덱스 저장
  const [openList, setOpenList] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const user = localStorage.getItem("jwt");
  const location = useLocation();
  const mapRef = useRef(null);

  // 값 초기화
  const dataSetting = (lat, lng) => {
    setMapCenter({
      lat,
      lng,
    });
    setActiveMarker(null);
    setSearchTerm("");
    setFilterModeAtom("dist");
    setSearchMode("location");
    setMapLevel(9);
  };

  // 현재 내위치와 낚시터의 거리
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const deg2rad = (deg) => {
      return deg * (Math.PI / 180);
    };

    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    // console.log(d);
    return d;
  };

  const callFishingSpot = async (latitude, longitude) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/spots`,
        {
          params: { latitude, longitude },
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data.spots
        .map((item) => {
          const dist = getDistance(
            latitude,
            longitude,
            item?.latitude,
            item?.longitude
          );
          return dist <= 20 ? { ...item, dist: dist } : null;
        })
        .filter(Boolean);

      console.log(data);

      setFishSpotList(data);
    } catch (error) {
      console.log(error);
    }
  };

  // 내위치
  const myLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setMyCenter((prev) => ({
            ...prev,
            center: {
              lat: latitude, // 위도
              lng: longitude, // 경도
            },
            isLoading: true,
          }));

          setCenterChange(false);

          if ((!mapCenter.lat && !mapCenter.lng) || !location.state?.data) {
            callFishingSpot(latitude, longitude);
            dataSetting(latitude, longitude);
          }
        },
        (err) => {
          console.log(err);
          setMyCenter((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      setMyCenter((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    myLocation();
  }, []);

  return (
    <div className="FishMap">
      <FishMapHeader
        hashTags={hashTags}
        mapRef={mapRef}
        getDistance={getDistance}
      />
      <FishMapBody
        openList={openList}
        mapRef={mapRef}
        getDistance={getDistance}
      />
      {activeMarker === null && (
        <FishMapFooter
          openList={openList}
          setOpenList={setOpenList}
          mapRef={mapRef}
          getDistance={getDistance}
        />
      )}
    </div>
  );
};

export default FishMapPage;
