import { useState } from "react";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import SearchIcon from "@mui/icons-material/Search";
import "../../assets/styles/fishmap/FishMapHeader.scss";
import { useRecoilState } from "recoil";
import { searchTermAtom } from "../../stores/FishingMapStore";

const FishMapHeader = ({ hashTags }) => {
  const [mode, setMode] = useState(false);
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermAtom);

  const changeMode = () => {
    setMode((prev) => !prev);
    setSearchTerm("");
  };

  return (
    <div className={`FishMapHeader ${mode && "expand"}`}>
      <div className={`wrapper ${mode && "expand"}`}>
        <div className="mode" onClick={changeMode}>
          {mode ? <TagOutlinedIcon /> : <NearMeOutlinedIcon />}
        </div>
        <input
          type="text"
          placeholder={mode ? "해시태그 검색" : "장소 검색"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="search">
          <SearchIcon />
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
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FishMapHeader;
