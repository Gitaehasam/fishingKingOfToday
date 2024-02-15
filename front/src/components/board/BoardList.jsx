import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BoardItem from "../board/BoardItem";
import boardlist from "../board/BoardList.json";
import placelist from "../board/PlaceList.json";
import "../../assets/styles/board/BoardList.scss";
import { getBoardList } from "../../api/board";

const BoardList = ({ category, viewType, fishType, hashType, sortType }) => {
  const [boardData, setBoardData] = useState([]);
  const url = "";

  const getList = async (cate, fish, hash, sort) => {
    await getBoardList(cate, fish, hash, sort).then((res) => setBoardData(res));

    console.log(boardData);
  };

  useEffect(() => {
    getList(category, fishType, hashType, sortType);
  }, [category, fishType, hashType, sortType]);

  return (
    <>
      <ul className={`${viewType == 0 ? "full-size" : "mini-size"}`}>
        {boardData.boards && (
          <>
            {boardData.boards.map((data) => (
              <BoardItem data={data} category={category} key={data.boardId} />
            ))}
          </>
        )}
      </ul>
    </>
  );
};

export default BoardList;
