import "../../assets/styles/FishMap/FishMapFooter.scss";
import { MdOutlineMap } from "react-icons/md";
import { FaListUl, FaCaretDown } from "react-icons/fa";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
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

  const sortData = useMemo(() => {
    return ddd.toSorted((a, b) =>
      filterMode === "dist"
        ? a.dist - b.dist
        : a.content.expense - b.content.expense
    );
  }, [filterMode, ddd]);

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
                    className={`${filterMode === "dist" ? "pick" : ""}`}
                    onClick={() => handleSubmit("dist")}
                  >
                    거리순 <div>{filterMode === "dist" && <FaCheck />}</div>
                  </button>
                </div>
                <div>
                  <button
                    className={`${filterMode === "money" ? "pick" : ""}`}
                    onClick={() => handleSubmit("money")}
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
          {ddd.length ? (
            sortData.map((item, idx) => (
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
            ))
          ) : (
            <div className="noneData">
              <InfoOutlinedIcon />
              <div>조건에 맞는 업체가 없습니다.</div>
            </div>
          )}
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
