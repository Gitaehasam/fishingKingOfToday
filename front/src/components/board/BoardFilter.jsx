import React, { useState } from "react";
import "../../assets/styles/board/BoardFilter.scss";

const BoardFilter = ({ category, closeCheck }) => {
  const [type, setType] = useState();

  const getList = (category) => {};

  return (
    <>
      <div className="board-filter-area">
        <div className="reset">초기화</div>
        <div className="filter-sub">정렬</div>
        <div className="sort-area">
          <label
            className={`sort-label ${type === "comments" ? "blue-bd" : ""}`}
          >
            댓글순
            <input
              type="radio"
              className="sort-type"
              value="comment"
              checked={type === "comments"}
              onChange={() => setType("comments")}
            />
          </label>
          <label
            className={`sort-label ${type === "createdAt" ? "blue-bd" : ""}`}
          >
            최신순
            <input
              type="radio"
              className="sort-type"
              value="createdAt"
              checked={type === "createdAt"}
              onChange={() => setType("createdAt")}
            />
          </label>
          <label className={`sort-label ${type === "likes" ? "blue-bd" : ""}`}>
            좋아요순
            <input
              type="radio"
              className="sort-type"
              value="likes"
              checked={type === "likes"}
              onChange={() => setType("likes")}
            />
          </label>
        </div>
        {category == 1 && (
          <>
            <div className="filter-sub">바다 어종</div>
            <div></div>
            <div className="filter-sub">민물 어종</div>
          </>
        )}
        {category == 2 && (
          <>
            <div className="filter-sub">추천태그</div>
          </>
        )}
        <div className="filter-button bg-blue shadow" onClick={closeCheck}>
          총 개 적용하기
        </div>
      </div>
    </>
  );
};

export default BoardFilter;
