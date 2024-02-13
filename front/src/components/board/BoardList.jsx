import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BoardItem from "../board/BoardItem";
import boardlist from "../board/BoardList.json";
import placelist from "../board/PlaceList.json";
import "../../assets/styles/board/BoardList.scss";
import { getBoardList } from "../../api/board";

const BoardList = ({ category, viewType }) => {
  const [boardData, setBoardData] = useState([]);

  const getList = async () => {
    await getBoardList(category).then((res) => setBoardData(res));
    console.log(boardData);
  };

  useEffect(() => {
    getList(category);
  }, [category]);

  return (
    <>
      <ul className={`${viewType == 0 ? "full-size" : "mini-size"}`}>
        {boardData.boards && (
          <>
            {boardData.boards.map((data) => (
              <Link to={`/media/board/${data.boardId}`} key={data.boardId} state={{ categoryId: category }}>
                <BoardItem data={data} />
              </Link>
            ))}
          </>
        )}
      </ul>
    </>
  );
};

export default BoardList;
