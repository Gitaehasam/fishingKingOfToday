import React, { useState, useEffect } from "react";
import "../../assets/styles/board/BoardFilter.scss";
import { getFilterFish, getFilterHash } from "../../api/board";
import back from "@assets/images/backSymbol.svg";

const BoardFilter = ({ category, closeCheck, filterBoard }) => {
  const [type, setType] = useState();
  const [fishId, setFishId] = useState();
  const [hashId, setHashId] = useState();
  const [seafish, setSeaFish] = useState([]);
  const [freshfish, setFreshFish] = useState([]);
  const [fivehash, setFiveHash] = useState([]);
  const [moreSea, SetMoreSea] = useState(false);
  const [moreFresh, SetMoreFresh] = useState(false);

  useEffect(() => {
    getList(category);
  }, [category]);

  const getList = (category) => {
    if (category == 1) {
      getFilterFish().then((data) => {
        setSeaFish(data.sea);
        setFreshFish(data.freshWater);
      });
    } else if (category == 2) {
      getFilterHash().then((data) => {
        console.log(data);
        setFiveHash(data);
      });
    }
  };

  const viewAll = (num) => {
    if (num == 1) {
      SetMoreSea((prev) => !prev);
    } else if (num == 2) {
      SetMoreFresh((prev) => !prev);
    }
  };

  const applyFilter = () => {
    filterBoard(type, fishId, hashId);
    setType();
    setFishId();
    setHashId();
    closeCheck();
  };

  const reset = () => {
    setType("");
    setFishId("");
  };

  return (
    <>
      <div className="board-filter-area">
        <img src={back} alt="" className="back-fish-lish" onClick={() => closeCheck()} />
        <div className="reset" onClick={() => reset()}>
          초기화
        </div>
        <div className="filter-sub">정렬</div>
        <div className="sort-area">
          <label className={`sort-label ${type === "comments" ? "blue-bd" : ""}`}>
            <div>댓글순</div>
            <input type="radio" className="sort-type" value="comment" checked={type === "comments"} onChange={() => setType("comments")} />
          </label>
          <label className={`sort-label ${type === "createdAt" ? "blue-bd" : ""}`}>
            <div>최신순</div>
            <input type="radio" className="sort-type" value="createdAt" checked={type === "createdAt"} onChange={() => setType("createdAt")} />
          </label>
          <label className={`sort-label ${type === "likes" ? "blue-bd" : ""}`}>
            <div>좋아요순</div>
            <input type="radio" className="sort-type" value="likes" checked={type === "likes"} onChange={() => setType("likes")} />
          </label>
        </div>
        {category == 1 && (
          <>
            <div className="filter-sub">바다 어종</div>
            <div className={`filter-fish ${moreSea ? "view" : ""}`}>
              <div className="morefish" onClick={() => viewAll(1)}>
                모두보기
              </div>
              {seafish.map((sea) => (
                <label className={`filter-fish-list ${fishId == sea.id ? "blue-bd" : ""}`} key={sea.id}>
                  <div>{sea.name}</div>
                  <input
                    type="radio"
                    className="sort-type"
                    value={sea.id}
                    checked={fishId == sea.id}
                    onChange={() => {
                      setFishId(sea.id);
                      console.log(fishId);
                    }}
                  />
                </label>
              ))}
            </div>
            <div className="filter-sub">민물 어종</div>
            <div className={`filter-fish ${moreFresh ? "view" : ""}`}>
              <div className="morefish" onClick={() => viewAll(2)}>
                모두보기
              </div>
              {freshfish.map((fresh) => (
                <label className={`filter-fish-list ${fishId === fresh.id ? "blue-bd" : ""}`} key={fresh.id}>
                  <div>{fresh.name}</div>
                  <input
                    type="radio"
                    className="sort-type"
                    value={fresh.id}
                    checked={fishId === fresh.id}
                    onChange={() => {
                      setFishId(fresh.id);
                      console.log(fishId);
                    }}
                  />
                </label>
              ))}
            </div>
          </>
        )}
        {category == 2 && (
          <>
            <div className="filter-sub">추천태그</div>
            <div className="filter-fish">
              {fivehash && (
                <>
                  {fivehash.map((hash) => (
                    <label className={`filter-fish-list ${hashId === hash.id ? "blue-bd" : ""}`} key={hash.id}>
                      <div>{hash.name}</div>
                      <input
                        type="radio"
                        className="sort-type"
                        value={hash.id}
                        checked={hashId === hash.id}
                        onChange={() => {
                          setHashId(hash.id);
                        }}
                      />
                    </label>
                  ))}
                </>
              )}
            </div>
          </>
        )}
        <div className="filter-button bg-blue shadow" onClick={() => applyFilter()}>
          적용하기
        </div>
      </div>
    </>
  );
};

export default BoardFilter;
