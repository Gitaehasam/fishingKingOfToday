import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import EditNoteIcon from "@mui/icons-material/EditNote";
import "@assets/styles/myPage/MyLocationPage.scss";

const MyLocationPage = () => {
  const [boardInfo, setBoardInfo] = useState([]);
  const navigate = useNavigate();

  const gotoCreate = () => {
    navigate("/media/board/create", {
      state: {
        categoryId: 2,
      },
    });
  };

  const aaa = async () => {
    const jwt = localStorage.getItem("jwt");

    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/users/boards`,
      {
        params: { categoryId: 2 },
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
    <div className="my-location-page">
      <Header centerText={"나의 물고기"} align="center" />
      {boardInfo.length ? (
        // <>
        //   <div className="none-data">낚시 기록을 시작해보세요.</div>
        //   <div className="go-create bg-blue" onClick={gotoCreate}>
        //     <EditNoteIcon />
        //   </div>
        // </>
        boardInfo.map((board) => {
          return (
            <div className="board-info" key={board.id}>
              <div>{board.boardId}</div>
              <div>{board.content}</div>
              <img src={board.imageUrl} alt="" />
            </div>
          );
        })
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

export default MyLocationPage;
