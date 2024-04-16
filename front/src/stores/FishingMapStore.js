import { atom } from "recoil";

// 낚시터 장소
export const fishSpotListAtom = atom({
  key: "fishSpotListAtom",
  default: [],
});

export const prevPathAtom = atom({
  key: "prevPathAtom",
  default: "",
});

// 활성화 마커 인덱스
export const activeMarkerAtom = atom({
  key: "activeMarkerAtom",
  default: null,
});

// 검색어
export const searchTermAtom = atom({
  key: "searchTermAtom",
  default: "",
});

// 지도 중심에서 움직임 파악
export const centerChangeAtom = atom({
  key: "centerChangeAtom",
  default: false,
});

export const searchModeAtom = atom({
  key: "searchModeAtom",
  default: "location",
});

// 낚시터 리스트 필터 (거리순, 요금순)
export const filterModeAtom = atom({
  key: "filterModeAtom",
  default: "dist",
});

export const mapLevelAtom = atom({
  key: "mapLevelAtom",
  default: 9,
});

// 지도 중심 좌표
export const mapCenterAtom = atom({
  key: "mapCenterAtom",
  default: {
    lat: 0,
    lng: 0,
  },
});

// 현재 내위치 좌표
export const myCenterAtom = atom({
  key: "myCenterAtom",
  default: {
    center: {
      lat: 0,
      lng: 0,
    },
    errMsg: null,
    isLoading: false,
  },
});
