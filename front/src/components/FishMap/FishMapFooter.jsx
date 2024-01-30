import "../../assets/styles/FishMap/FishMapFooter.scss";
import { MdOutlineMap } from "react-icons/md";
import { FaListUl, FaCaretDown } from "react-icons/fa";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import FishMapItem from "./FishMapItem";

const FishMapFooter = ({
  isIs,
  ddd,
  setIsIs,
  setActiveMarker,
  setCenterChange,
  mapRef,
  filterMode,
  setFilterMode,
  getDistanceFromLatLonInKm,
  myCenter,
}) => {
  const [openFilter, setOpenFilter] = useState(false);

  const handleSubmit = (mode) => {
    setOpenFilter(false);
    setFilterMode(mode);
  };

  return (
    <div className={`FishMapFooter ${isIs && "expand"}`}>
      {isIs && (
        <>
          <div className="filter" onClick={() => setOpenFilter(true)}>
            {filterMode === "dist" ? "거리순" : "비용순"} <FaCaretDown />
          </div>
          {openFilter && (
            <>
              <div
                className="filterOpen"
                onClick={() => setOpenFilter(false)}
              ></div>
              <div className="content">
                <h2>검색 설정</h2>
                <div>
                  <button
                    className={`${filterMode === "dist" && "pick"}`}
                    onClick={() => handleSubmit("dist")}
                  >
                    거리순 <div>{filterMode === "dist" && <FaCheck />}</div>
                  </button>
                </div>
                <div>
                  <button
                    className={`${filterMode === "money" && "pick"}`}
                    onClick={() => handleSubmit("moeny")}
                  >
                    비용순<div>{filterMode === "money" && <FaCheck />}</div>
                  </button>
                </div>
                <div>
                  <button
                    className="cancel"
                    onClick={() => setOpenFilter(false)}
                  >
                    취소
                  </button>
                </div>
              </div>
            </>
          )}
          {ddd.map((item, idx) => (
            <FishMapItem
              key={idx}
              item={item}
              idx={idx}
              myCenter={myCenter}
              setIsIs={setIsIs}
              setActiveMarker={setActiveMarker}
              setCenterChange={setCenterChange}
              getDistanceFromLatLonInKm={getDistanceFromLatLonInKm}
            />
          ))}
        </>
      )}
      <div className="mode" onClick={() => setIsIs((prev) => !prev)}>
        {isIs ? (
          <>
            <MdOutlineMap />
            <div>지도보기</div>
          </>
        ) : (
          <>
            <FaListUl />
            <div>목록보기</div>
          </>
        )}
      </div>
    </div>
  );
};

export default FishMapFooter;
