import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../assets/styles/fishmap/FishMapPage.scss";
import FishMapFooter from "../components/fishmap/FishMapFooter";
import FishMapHeader from "../components/fishmap/FishMapHeader";
import FishMapBody from "../components/fishmap/FishMapBody";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { activeMarkerAtom } from "@/stores/FishingMapStore.js";
import {
  centerChangeAtom,
  filterModeAtom,
  mapCenterAtom,
  myCenterAtom,
  searchTermAtom,
} from "../stores/FishingMapStore";
import { useLocation } from "react-router-dom";

const dummyData = [
  {
    content: {
      name: "상무낚시터",
      type: "기타낚시",
      addr: "광주광역시 서구 유덕로141번길 31-1",
      tel: "062-373-0558",
      hashTag: ["월척"],
      expense: 10000,
      fishes: ["용치놀래기", "가다랑어", "붉바리", "보리멸", "자리돔", "참돔"],
    },
    latlng: { lat: 35.16357724, lng: 126.8386542 },
  },
  {
    content: {
      name: "땅끝낚시터",
      type: "바다낚시",
      addr: "전라남도 해남군 송지면 갈산길 93, 땅끝낚시터",
      tel: "061-536-1234",
      hashTag: ["사진맛집", "월척"],
      expense: 20000,
      fishes: ["가다랑어", "보리멸"],
    },
    latlng: { lat: 34.30556, lng: 126.516116 },
  },
  {
    content: {
      name: "정남진 해양낚시공원",
      type: "바다낚시",
      addr: "전라남도 장흥군 회진면 해양낚시길 135",
      tel: "061-867-0555",
      hashTag: ["사진맛집"],
      expense: 15000,
      fishes: ["자리돔", "참돔"],
    },
    latlng: { lat: 34.4706335, lng: 126.9740566 },
  },
  {
    content: {
      name: "거금해양낚시공원",
      type: "바다낚시",
      addr: "전라남도 고흥군 금산면 신촌내동길 18-132",
      tel: "061-843-6060",
      hashTag: ["#사진맛집", "#노을맛집", "#월척"],
      expense: 14000,
      fishes: ["가다랑어", "붉바리"],
    },
    latlng: { lat: 34.46942797, lng: 127.104524 },
  },
  {
    content: {
      name: "홀통낚시터",
      type: "바다낚시",
      addr: "전라남도 무안군 현경면 홀통길 198-1",
      tel: "",
      hashTag: ["#노을맛집", "#월척"],
      expense: 10000,
      fishes: ["가다랑어", "붉바리"],
    },
    latlng: { lat: 35.0616396163, lng: 126.3321694341 },
  },
  {
    content: {
      name: "늘푸른낚시",
      type: "바다낚시",
      addr: "전라남도 무안군 운남면 운해로 1",
      tel: "061-452-5660",
      hashTag: ["#노을맛집"],
      expense: 20000,
      fishes: ["가다랑어", "붉바리"],
    },
    latlng: { lat: 34.9153538678, lng: 126.3384728811 },
  },
];

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
  const [mapCenter, setMapCenter] = useRecoilState(mapCenterAtom);
  const [activeMarker, setActiveMarker] = useRecoilState(activeMarkerAtom); // 활성화 마커 인덱스 저장
  const [openList, setOpenList] = useState(false);
  const location = useLocation();
  console.log(location);
  const mapRef = useRef(null);

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

  const dataSetting = (lat, lng) => {
    setMapCenter({
      lat: lat,
      lng: lng,
    });
    setActiveMarker(null);
    setSearchTerm("");
    setFilterModeAtom("dist");
  };

  // 현재 내위치와 낚시터의 거리
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const deg2rad = (deg) => {
      return deg * (Math.PI / 180);
    };

    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    // console.log(d);
    return d;
  };

  const addData = useMemo(() => {
    return dummyData
      .map((item) => {
        const dist = getDistance(mapCenter.lat, mapCenter.lng, item.latlng.lat, item.latlng.lng);
        return dist <= 20 ? { ...item, dist: dist } : null;
      })
      .filter(Boolean);
  }, [mapCenter]);

  useEffect(() => {
    myLocation();
    // dataSetting();
  }, []);

  return (
    <div className="FishMap">
      <FishMapHeader hashTags={hashTags} mapRef={mapRef} />
      <FishMapBody
        openList={openList}
        mapRef={mapRef}
        addData={addData}
        getDistance={getDistance}
      />
      {activeMarker === null && (
        <FishMapFooter
          openList={openList}
          setOpenList={setOpenList}
          addData={addData}
          mapRef={mapRef}
          getDistance={getDistance}
        />
      )}
    </div>
  );
};

export default FishMapPage;
