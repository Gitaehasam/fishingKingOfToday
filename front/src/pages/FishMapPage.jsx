import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../assets/styles/FishMap/FishMapPage.scss";
import FishMapFooter from "../components/FishMap/FishMapFooter";
import FishMapHeader from "../components/FishMap/FishMapHeader";
import FishMapBody from "../components/FishMap/FishMapBody";

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

const hashTags = ["#사진맛집", "#노을맛집", "#월척"];

const FishMapPage = () => {
  const [activeMarker, setActiveMarker] = useState(null); // 활성화 마커 인덱스 저장
  const [openList, setOpenList] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [centerChange, setCenterChange] = useState(false); // 지도 중심에서 움직임 파악
  const [filterMode, setFilterMode] = useState("dist"); // 낚시터 리스트 필터 (거리순, 요금순)
  const [mapCenter, setMapCenter] = useState({
    lat: 33.450701,
    lng: 126.570667,
  }); // 지도 중심 좌표
  const [myCenter, setMyCenter] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: false,
  }); // 현재 내위치 좌표

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

          setMapCenter({
            lat: latitude,
            lng: longitude,
          });
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

  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const locPosition = new kakao.maps.LatLng(lat, lng);
        mapRef.current.setCenter(locPosition);
        setCenterChange(false);
        setMyCenter((prev) => ({
          ...prev,
          center: {
            lat: lat, // 위도
            lng: lng, // 경도
          },
          isLoading: true,
        }));
      });
    } else {
      window.alert("이 브라우저에서는 Geolocation을 지원하지 않습니다.");
    }
  };

  const getInfo = () => {
    const map = mapRef.current;
    if (!map) return;

    const center = map.getCenter();

    map.setCenter(center);
    setCenterChange(false);
    setActiveMarker(null);
    setFilterMode("dist");

    setMapCenter({
      lat: center.getLat(),
      lng: center.getLng(),
    });
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

  const addData = useMemo(() => {
    return dummyData
      .map((item) => {
        const dist = getDistance(
          mapCenter.lat,
          mapCenter.lng,
          item.latlng.lat,
          item.latlng.lng
        );
        return dist <= 20 ? { ...item, dist: dist } : null;
      })
      .filter(Boolean);
  }, [mapCenter]);

  useEffect(() => {
    myLocation();
  }, []);

  return (
    <div className="FishMap">
      <FishMapHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleChange={(e) => setSearchTerm(e.target.value)}
        hashTags={hashTags}
      />
      <FishMapBody
        centerChange={centerChange}
        mapRef={mapRef}
        handleClickMarker={() => setActiveMarker(null)}
        setCenterChange={setCenterChange}
        addData={addData}
        myCenter={myCenter}
        openList={openList}
        activeMarker={activeMarker}
        setActiveMarker={setActiveMarker}
        handleClick={handleClick}
        getInfo={getInfo}
        getDistance={getDistance}
      />
      {activeMarker === null && (
        <FishMapFooter
          openList={openList}
          myCenter={myCenter.center}
          addData={addData}
          setOpenList={setOpenList}
          setActiveMarker={setActiveMarker}
          setCenterChange={setCenterChange}
          mapRef={mapRef}
          filterMode={filterMode}
          setFilterMode={setFilterMode}
          getDistance={getDistance}
        />
      )}
    </div>
  );
};

export default FishMapPage;
