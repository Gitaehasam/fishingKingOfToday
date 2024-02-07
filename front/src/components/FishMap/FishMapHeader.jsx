import { useMemo, useState } from "react";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import SearchIcon from "@mui/icons-material/Search";
import "../../assets/styles/fishmap/FishMapHeader.scss";
import { useRecoilState, useSetRecoilState } from "recoil";
import { centerChangeAtom, searchTermAtom } from "../../stores/FishingMapStore";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const FishMapHeader = ({ hashTags, mapRef }) => {
  const [mode, setMode] = useState(false);
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermAtom);
  const setCenterChange = useSetRecoilState(centerChangeAtom);

  const changeMode = () => {
    setMode((prev) => !prev);
    setSearchTerm("");
  };

  const handleClick = (e) => {
    const map = mapRef.current;
    if (!map) return;

    map.setLevel(13);
    map.setCenter(new kakao.maps.LatLng(36.172823447489336, 127.8675122717897));
    setCenterChange(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick();
    // setSearchTerm("");
  };

  const hashTagsElements = useMemo(
    () =>
      hashTags.map((hashTag, index) => (
        <div className="input-container" key={index} onClick={handleClick}>
          <input
            id={`${hashTag}`}
            className="radio-button"
            type="radio"
            name="radio"
            checked={searchTerm === hashTag.substring(1)}
            value={hashTag.substring(1)}
            onChange={(e) => setSearchTerm(e.target.value)}
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

  return (
    <div className={`FishMapHeader ${mode && "expand"}`}>
      <div className={`wrapper ${mode && "expand"}`}>
        <button className="chmode" onClick={changeMode}>
          {mode ? <TagOutlinedIcon /> : <NearMeOutlinedIcon />}
        </button>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={mode ? "해시태그 검색" : "지역, 장소 검색"}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <div className="search" onClick={() => setSearchTerm("")}>
          {searchTerm && <CloseOutlinedIcon />}
        </div>
      </div>
      {mode && <div className="hashTags">{hashTagsElements}</div>}
    </div>
  );
};

export default FishMapHeader;
