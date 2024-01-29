import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import EventMarker from "../components/FishMap/EventMarker";
import { MdGpsFixed } from "react-icons/md";
import { FaHashtag } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { TbLocation } from "react-icons/tb";
import { IoMdRefresh } from "react-icons/io";
import { FaListUl } from "react-icons/fa";
import "../assets/styles/FishMap/FishMapPage.scss";

const data = [
  {
    content: {
      name: "상무낚시터",
      type: "기타낚시",
      addr: "광주광역시 서구 유덕로141번길 31-1",
      tel: "062-373-0558",
      hashTag: ["월척"],
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
    },
    latlng: { lat: 34.9153538678, lng: 126.3384728811 },
  },
];

const hashTags = ["#사진맛집", "#노을맛집", "#월척"];

const FishMapPage = () => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isIs, setIsIs] = useState(false);
  const [mode, setMode] = useState(false);
  const [search, setSearch] = useState("");
  const [centerChange, setCenterChange] = useState(false);
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: false,
  });

  const mapRef = useRef(null);

  const chageMode = useCallback(() => {
    setMode((prev) => !prev);
    setSearch("");
  }, []);

  const handleClickMarker = useCallback(() => {
    setActiveMarker(null);
    setIsOpen(false);
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const myLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setState((prev) => ({
            ...prev,
            center: {
              lat: latitude, // 위도
              lng: longitude, // 경도
            },
            isLoading: true,
          }));
        },
        (err) => {
          console.log(err);
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      setState((prev) => ({
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
        setState((prev) => ({
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

    setState((prev) => ({
      ...prev,
      center: {
        lat: center.getLat(),
        lng: center.getLng(),
      },
      isLoading: false,
    }));
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
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
    console.log(d);
    return d;
  };

  const ddd = useMemo(() => {
    return data.filter(
      (item) =>
        getDistanceFromLatLonInKm(
          state.center.lat,
          state.center.lng,
          item.latlng.lat,
          item.latlng.lng
        ) <= 20
    );
  }, [state]);

  useEffect(() => {
    myLocation();
  }, []);

  return (
    <div className="FishMap">
      <div className={`FishMap_header ${mode && "expand"}`}>
        <div className={`wrapper ${mode && "expand"}`}>
          <div className="mode" onClick={chageMode}>
            {mode ? <FaHashtag /> : <TbLocation />}
          </div>
          <input
            type="text"
            placeholder={mode ? "해시태그 검색" : "장소 검색"}
            value={search}
            onChange={handleChange}
          />
          <div className="search">
            <FaSearch />
          </div>
        </div>
        {mode && (
          <div className="hashTags">
            {hashTags.map((hashTag, index) => {
              // return <div key={index}>{hashTag}</div>;
              return (
                <div className="input-container" key={index}>
                  <input
                    id={`${hashTag}`}
                    className="radio-button"
                    type="radio"
                    name="radio"
                    checked={search === hashTag.substring(1)}
                    value={hashTag.substring(1)}
                    onChange={handleChange}
                  />
                  <div className="radio-tile">
                    <label htmlFor={`${hashTag}`} className="radio-tile-label">
                      {hashTag}
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="FishMap_body">
        {centerChange && (
          <div className="reSearch" onClick={getInfo}>
            <IoMdRefresh />이 지역 검색
          </div>
        )}
        <Map // 지도를 표시할 Container
          center={state.center}
          ref={mapRef}
          level={10} // 지도의 확대 레벨
          onClick={handleClickMarker}
          onCenterChanged={() => setCenterChange(true)}
        >
          {ddd.map((value, index) => (
            <EventMarker
              key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
              position={value.latlng}
              content={value.content}
              isActive={activeMarker === index}
              onClick={() => setActiveMarker(index)}
            />
          ))}
          {state.isLoading && (
            <MapMarker
              position={state.center}
              clickable={true}
              onClick={() => setIsOpen(true)}
              image={{
                src: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
                size: { width: 30, height: 30 },
                // options: {
                //   offset: {
                //     x: 15,
                //     y: 0,
                //   },
                // },
              }}
            >
              {isOpen && (
                <div style={{ padding: "5px", color: "#000" }}>
                  {state.errMsg ? state.errMsg : "여기에 계신가요?!"}
                </div>
              )}
            </MapMarker>
          )}

          <button
            style={{ bottom: activeMarker !== null ? "180px" : "20px" }}
            className="FishMap_btn"
            onClick={handleClick}
          >
            <MdGpsFixed />
          </button>
        </Map>
      </div>
      {activeMarker === null && (
        <div
          className={`FishMap_footer ${isIs && "expand"}`}
          onClick={() => setIsIs(true)}
        >
          <FaListUl />
          목록보기
        </div>
      )}
    </div>
  );
};

export default FishMapPage;
