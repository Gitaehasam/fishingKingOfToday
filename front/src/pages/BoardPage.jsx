import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import back from "../assets/images/backSymbol.svg";
import filter from "../assets/images/filter.png";
import "../assets/styles/board/BoardPage.scss";
import WindowIcon from "@mui/icons-material/Window";
import BoardList from "../components/board/BoardList";
import EditNoteIcon from '@mui/icons-material/EditNote';

const BoardPage = () => {
  const [category, setCategory] = useState(1);
  const [viewType, setViewChange] = useState(0);

  const changeCategory = (type) => {
    setCategory(type);
  };

  const changeView = (type) => {
    setViewChange(type);
  };

  const navigate = useNavigate();

  const gotoCreate = () => {
    navigate("/media/board/create", {
      state: {
        categoryId : category
      }
    })
  }

  return (
    <>
      <img className="backfish" src={back} alt="" onClick={() => history.back()} />
      <div className="category-header">
        <div className={`category-title ${category == 1 ? "active" : ""}`} onClick={() => changeCategory(1)}>
          물고기
        </div>
        <div className={`category-title ${category == 2 ? "active" : ""}`} onClick={() => changeCategory(2)}>
          장소자랑
        </div>
      </div>
      <div className="type-select">
        <div className={`full ${viewType == 0 && "active"}`} onClick={() => changeView(0)}></div>
        <div className={`divide ${viewType == 1 && "active"}`} onClick={() => changeView(1)}>
          <WindowIcon />
        </div>
        <div className="filter">
          <img src={filter} alt="" />
        </div>
      </div>
      {category == 1 && <BoardList category={category} viewType={viewType} />}
      {category == 2 && <BoardList category={category} viewType={viewType} />}
      <div className="create-post-btn bg-blue" onClick={() => gotoCreate()}>
        <EditNoteIcon />
      </div>
    </>
  );
};

export default BoardPage;
