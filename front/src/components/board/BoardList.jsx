import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BoardItem from "../board/BoardItem";
import boardlist from "../board/BoardList.json";
import placelist from "../board/PlaceList.json";
import "../../assets/styles/board/BoardList.scss";
import { getBoardList } from "../../api/board";

const BoardList = ({ category, viewType }) => {
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    if (category == 1) {
      // setBoardData(boardlist.boards);
    } else if (category == 2) {
      setBoardData(placelist.boards);
    }
  }, [category]);

  return (
    <>
      <ul className={`${viewType == 0 ? "full-size" : "mini-size"}`}>
        {boardData.map((data) => (
          <Link to={`/media/board/${data.boardId}`} key={data.boardId}>
            <BoardItem data={data} />
          </Link>
        ))}
      </ul>
    </>
  );
};

export default BoardList;
