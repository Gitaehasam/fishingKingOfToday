import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import back from "../assets/images/backSymbol.svg";
import filter from "../assets/images/filter.png";
import "../assets/styles/board/BoardPage.scss";
import WindowIcon from "@mui/icons-material/Window";
import BoardList from "../components/board/BoardList";
import BoardFilter from "../components/board/BoardFilter";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Header from "../components/Header";

const BoardPage = () => {
  const [category, setCategory] = useState(1);
  const [viewType, setViewChange] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [sortType, setSortType] = useState("");
  const [fishType, setFishType] = useState("");
  const [hashType, setHashType] = useState("");

  const closeCheck = () => {
    setIsOpen(false);
  };

  const changeCategory = (type) => {
    setCategory(type);
    setSortType("");
    setFishType("");
    setHashType("");
  };

  const changeView = (type) => {
    setViewChange(type);
  };

  const navigate = useNavigate();

  const gotoCreate = () => {
    navigate("/media/board/create", {
      state: {
        categoryId: category,
      },
    });
  };

  const filterBoard = (sort, fish, hash) => {
    console.log(sort);
    if (sort) {
      setSortType(sort);
    }
    if (fish) {
      setFishType(fish);
    }
    if (hash) {
      setHashType(hash);
    }
  };

  return (
    <>
      <div className="category-boardpage ">
        <Header />
        <div
          className="category-header blue-bd"
          style={{ borderWidth: "1px 0" }}
        >
          <div
            className={`category-title ${category == 1 ? "blue-fc" : ""}`}
            onClick={() => changeCategory(1)}
          >
            <div
              className={`underbar ${category == 1 ? "bg-blue" : "none"}`}
            ></div>
            물고기
          </div>
          <div
            className={`category-title ${category == 2 ? "blue-fc" : ""}`}
            onClick={() => changeCategory(2)}
          >
            <div
              className={`underbar ${category == 2 ? "bg-blue" : "none"}`}
            ></div>
            장소자랑
          </div>
        </div>
        <div className="type-select">
          <div
            className={`full ${viewType == 0 && "bg-blue"}`}
            onClick={() => changeView(0)}
          ></div>
          <div
            className={`divide ${viewType == 1 && "active"}`}
            onClick={() => changeView(1)}
          >
            <WindowIcon />
          </div>
          <input
            type="checkbox"
            id="check"
            checked={isOpen}
            onChange={() => setIsOpen((prev) => !prev)}
          />
          <label htmlFor="check" className="filter">
            <img src={filter} alt="" />
          </label>
          <div className="board-filter">
            <BoardFilter
              category={category}
              closeCheck={closeCheck}
              filterBoard={filterBoard}
            />
          </div>
        </div>
        <BoardList
          category={category}
          viewType={viewType}
          sortType={sortType}
          fishType={fishType}
          hashType={hashType}
        />
        <div className="create-post-btn bg-blue" onClick={() => gotoCreate()}>
          <EditNoteIcon />
        </div>
      </div>
    </>
  );
};

export default BoardPage;
