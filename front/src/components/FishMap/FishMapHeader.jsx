import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  activeMarkerAtom,
  centerChangeAtom,
  fishSpotListAtom,
  mapLevelAtom,
  myCenterAtom,
  searchModeAtom,
  searchTermAtom,
} from "../../stores/FishingMapStore";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import "@assets/styles/fishmap/FishMapHeader.scss";

const FishMapHeader = ({ hashTags, mapRef, getDistance }) => {
  const [regionList, setRegionList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [searchMode, setSearchMode] = useRecoilState(searchModeAtom);
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermAtom);
  const setMapLevel = useSetRecoilState(mapLevelAtom);
  const setCenterChange = useSetRecoilState(centerChangeAtom);
  const setFishSpotList = useSetRecoilState(fishSpotListAtom);
  const setActiveMarker = useSetRecoilState(activeMarkerAtom);
  const myCenter = useRecoilValue(myCenterAtom);

  // 검색시 지도 전체보기
  const handleClick = (e) => {
    const map = mapRef.current;
    if (!map) return;

    map.setLevel(13);
    map.setCenter(new kakao.maps.LatLng(36.172823447489336, 127.8675122717897));
    setMapLevel(13);
    setCenterChange(false);
    setActiveMarker(null);
  };

  // 낚시터 데이터 호출
  const fetchSpots = async (params) => {
    console.log(params);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/spots`,
        {
          params,
        }
      );

      const data = res.data.spots.map((item) => {
        const dist = getDistance(
          myCenter.center.lat,
          myCenter.center.lng,
          item?.latitude,
          item?.longitude
        );
        return { ...item, dist: dist };
      });

      setFishSpotList(data);
      handleClick();
    } catch (error) {
      console.log(error);
    }
  };

  // 장소, 해쉬태그 검색
  const handleSubmit = (e) => {
    e.preventDefault();

    let params = {};
    if (searchMode === "location" || searchMode === "hash") {
      params.keyword =
        e.type === "submit"
          ? searchMode === "location"
            ? searchTerm
            : `#${searchTerm}`
          : `#${e.target.value}`;
    } else {
      params.sido = e.target.value;
    }

    fetchSpots(params);
  };

  // 장소, 지역, 해쉬태그 검색 모드 변경
  const modeChange = (e) => {
    setSearchMode(e.target.value);
    setIsChecked(false);
    setSearchTerm("");
  };

  // 대한민국의 모든 특별/광역시, 도 반환
  const callRegion = async () => {
    const res = await axios.get(
      "https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000"
    );

    const data = res.data.regcodes.filter(
      (item) => item.name !== "제주특별자치도"
    );
    setRegionList(data);
  };

  const hashTagsElements = useMemo(
    () =>
      hashTags.map((hashTag, index) => (
        <div className="input-container" key={index}>
          <input
            id={`${hashTag}`}
            className="radio-button"
            type="radio"
            name="radio"
            checked={searchTerm === hashTag.substring(1)}
            value={hashTag.substring(1)}
            onChange={(e) => {
              handleSubmit(e);
              setSearchTerm(e.target.value);
            }}
          />
          <div className="radio-tile">
            <label htmlFor={`${hashTag}`} className="radio-tile-label">
              {hashTag}
            </label>
          </div>
        </div>
      )),
    [hashTags, handleClick, searchTerm]
  );

  useEffect(() => {
    callRegion();
  }, []);

  return (
    <div className={`FishMapHeader ${searchMode === "hash" && "expand"}`}>
      <div className={`wrapper ${searchMode === "hash" && "expand"}`}>
        <div className="wrapper1">
          <input
            type="checkbox"
            id="toogle"
            className="hidden-trigger"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <label htmlFor="toogle" className="circle">
            <FilterAltOutlinedIcon />
          </label>

          <div className="subs">
            <button className="sub-circle">
              <input
                value="location"
                name="sub-circle"
                type="radio"
                id="sub1"
                className="hidden-sub-trigger"
                onClick={modeChange}
              />
              <label htmlFor="sub1">장소</label>
            </button>
            <button className="sub-circle">
              <input
                value="region"
                name="sub-circle"
                type="radio"
                id="sub2"
                className="hidden-sub-trigger"
                onClick={modeChange}
              />
              <label htmlFor="sub2">지역</label>
            </button>
            <button className="sub-circle">
              <input
                value="hash"
                name="sub-circle"
                type="radio"
                id="sub3"
                className="hidden-sub-trigger"
                onClick={modeChange}
              />
              <label htmlFor="sub3">해쉬태그</label>
            </button>
          </div>
        </div>
        {searchMode === "region" ? (
          <>
            <select
              value={searchTerm}
              onChange={(e) => {
                handleSubmit(e);
                setSearchTerm(e.target.value);
              }}
            >
              <option value={""} disabled>
                지역선택
              </option>
              {regionList.map((region) => {
                return (
                  <option key={region.code} value={region.name}>
                    {region.name}
                  </option>
                );
              })}
            </select>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={
                searchMode === "location" ? "장소 검색" : "해시태그 검색"
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        )}

        <div className="search" onClick={() => setSearchTerm("")}>
          {searchTerm && <CloseOutlinedIcon />}
        </div>
      </div>
      {searchMode && <div className="hashTags">{hashTagsElements}</div>}
    </div>
  );
};

export default FishMapHeader;
