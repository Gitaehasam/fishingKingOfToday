import { FaSearch, FaHashtag } from "react-icons/fa";
import { TbLocation } from "react-icons/tb";
import "../../assets/styles/FishMap/FishMapHeader.scss";
import { useState } from "react";

const FishMapHeader = ({ setSearch, search, handleChange, hashTags }) => {
  const [mode, setMode] = useState(false);

  const changeMode = () => {
    setMode((prev) => !prev);
    setSearch("");
  };

  return (
    <div className={`FishMapHeader ${mode && "expand"}`}>
      <div className={`wrapper ${mode && "expand"}`}>
        <div className="mode" onClick={changeMode}>
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
  );
};

export default FishMapHeader;
