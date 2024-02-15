import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import EditNoteIcon from "@mui/icons-material/EditNote";
import "@assets/styles/myPage/MyFishPage.scss";

const MyFishPage = () => {
  const [boardInfo, setBoardInfo] = useState([]);
  const navigate = useNavigate();

  const gotoCreate = () => {
    navigate("/media/board/create", {
      state: {
        categoryId: 1,
      },
    });
  };

  const aaa = async () => {
    const jwt = localStorage.getItem("jwt");

    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/users/boards`,
      {
        params: { categoryId: 1 },
        headers: {
          Authorization: jwt,
        },
      }
    );
    console.log(res.data.myBoardResponses);
    setBoardInfo(res.data.myBoardResponses);
  };

  useEffect(() => {
    aaa();
  }, []);

  return (
    <div className="my-fish-page">
      <Header centerText={"나의 물고기"} align="center" />
      {boardInfo.length ? (
        // <>
        //   <div className="none-data">낚시 기록을 시작해보세요.</div>
        //   <div className="go-create bg-blue" onClick={gotoCreate}>
        //     <EditNoteIcon />
        //   </div>
        // </>
        <div className="wrapper">
          {boardInfo.map((board) => {
            return (
              <div className="board-info" key={board.id}>
                <div>{board.boardId}</div>
                <div>{board.content}</div>
                <img src={board.imageUrl} alt="" />
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div className="none-data">낚시 기록을 시작해보세요.</div>
          <div className="go-create bg-blue" onClick={gotoCreate}>
            <EditNoteIcon />
          </div>
        </>
      )}
    </div>
  );
};

export default MyFishPage;
