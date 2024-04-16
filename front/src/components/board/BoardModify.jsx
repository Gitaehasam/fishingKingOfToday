import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import BoardFormItem from "./BoardFormItem";
import Header from "../Header";
import { getBoardDetail } from "../../api/board";

const BoardModify = () => {
  const { id } = useParams();
  const [boardData, setBoardData] = useState([]);
  const location = useLocation();

  const [categoryId, setCategoryId] = useState(location.state?.categoryId);

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    await getBoardDetail(id).then((res) => setBoardData(res));
  };

  return (
    <>
      <Header centerText="수정하기" />
      <div>{boardData && <BoardFormItem type={"modify"} categoryId={categoryId} boardData={boardData} />}</div>
    </>
  );
};

export default BoardModify;
