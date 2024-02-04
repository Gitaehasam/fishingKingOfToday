import { useMemo, useState } from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FishMapItem from "./FishMapItem";
import "@assets/styles/fishmap/FishMapFooter.scss";
import { useRecoilState, useSetRecoilState } from "recoil";
import { filterModeAtom } from "../../stores/FishingMapStore";

const FishMapFooter = ({
  addData,
  mapRef,
  getDistance,
  openList,
  setOpenList,
}) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [filterMode, setFilterMode] = useRecoilState(filterModeAtom);

  const handleSubmit = (mode) => {
    setOpenFilter(false);
    setFilterMode(mode);
  };

  const sortData = useMemo(() => {
    return addData.toSorted((a, b) =>
      filterMode === "dist"
        ? a.dist - b.dist
        : a.content.expense - b.content.expense
    );
  }, [filterMode, addData]);

  return (
    <div className={`FishMapFooter ${openList && "expand"}`}>
      {openList && (
        <>
          <button className="filter" onClick={() => setOpenFilter(true)}>
            {filterMode === "dist" ? "거리순" : "비용순"}
            <ArrowDropDownOutlinedIcon />
          </button>
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
                    거리순{" "}
                    <div>{filterMode === "dist" && <CheckOutlinedIcon />}</div>
                  </button>
                </div>
                <div>
                  <button
                    className={`${filterMode === "money" ? "pick" : ""}`}
                    onClick={() => handleSubmit("money")}
                  >
                    비용순
                    <div>{filterMode === "money" && <CheckOutlinedIcon />}</div>
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
          {addData.length ? (
            sortData.map((item, idx) => (
              <FishMapItem
                key={idx}
                item={item}
                idx={idx}
                mapRef={mapRef}
                setOpenList={setOpenList}
                getDistance={getDistance}
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
      <div className="mode" onClick={() => setOpenList((prev) => !prev)}>
        {openList ? (
          <>
            <MapOutlinedIcon />
            <div>지도보기</div>
          </>
        ) : (
          <>
            <FormatListBulletedIcon />
            <div>목록보기</div>
          </>
        )}
      </div>
    </div>
  );
};

export default FishMapFooter;
