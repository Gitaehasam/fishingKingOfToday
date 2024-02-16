import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import BoardFormItem from "./BoardFormItem";
import "../../assets/styles/board/BoardDetail.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import Header from "../Header";
import { getBoardDetail, deleteBoardPost, sendBoardReply, deleteBoardReply, putPostLike, deletePostLike } from "../../api/board";
import BoardDetailMap from "./BoardDetailMap";
import Loading from "../Loading";

const BoardDetail = () => {
  const location = useLocation();
  const [category, setCategory] = useState(location.state?.categoryId);
  const navigate = useNavigate();
  const { id } = useParams();
  const [boardData, setBoardData] = useState({});
  const userId = 3330361706;
  const [reply, setReply] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("user"));

  const [boardlike, setBoardLike] = useState();
  const [likecnt, setLikeCnt] = useState();

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    await getBoardDetail(id).then((res) => {
      setBoardData(res);
      if (res.isLiked) {
        setBoardLike(true);
        setLikeCnt(res.likeCnt);
      } else {
        setBoardLike(false);
        setLikeCnt(res.likeCnt);
      }
    });
  };

  const deletePost = async () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      await deleteBoardPost(id).then((res) => {
        console.log(res);
        alert("삭제되었습니다.");
        navigate("/media/board");
      });
    }
  };

  const modifyPost = async () => {
    console.log(location.state);
    if (window.confirm("게시글을 수정하시겠습니까?")) {
      navigate(`/media/board/modify/${id}`, {
        state: {
          categoryId: category,
        },
      });
    }
  };

  const changeDate = (date) => {
    const start = date + "";
    const day = start.substring(0, 10);
    const time = start.substring(11, 16);
    console.log(day);
    return day + " " + time;
  };

  const sendReply = async (e) => {
    if (e.key === "Enter") {
      await sendBoardReply(id, reply).then((res) => {
        getDetail();
      });
      setReply("");
    }
  };

  const deleteReply = async (replyId) => {
    await deleteBoardReply(id, replyId).then((res) => {
      getDetail();
    });
  };

  const postDisLike = async (postId) => {
    await deletePostLike(postId).then((res) => {
      setBoardLike(false);
      setLikeCnt((prev) => prev - 1);
    });
  };

  const postLike = async (postId) => {
    await putPostLike(postId).then((res) => {
      setBoardLike(true);
      setLikeCnt((prev) => prev + 1);
    });
  };

  if (!Object.keys(boardData).length) {
    console.log(1);
    return <Loading />;
  }

  return (
    <>
      <Header />
      {boardData && (
        <>
          <div className="board-detail-area">
            <div className="board-detail-item">
              <div className="board-title">
                <img className="board-detail-profile" src={boardData.profileImageUrl} alt="프로필" />
                <div className="board-nickname">{boardData.nickName}</div>
                <div className="like-area">
                  {boardlike && (
                    <div className="post-icon post-like">
                      <FavoriteIcon onClick={() => postDisLike(boardData.boardId)} />
                    </div>
                  )}
                  {!boardlike && (
                    <div className="post-icon">
                      <FavoriteBorderIcon onClick={() => postLike(boardData.boardId)} />
                    </div>
                  )}
                  <div className="like">{likecnt}</div>
                </div>
              </div>
              <img className="board-content-img" src={boardData.boardImageUrl} alt="" />
              <div className="board-text">{boardData.content}</div>
              <div className="board-hashtag-area">
                {boardData.fishName && (
                  <div className="blue-bd">
                    <div className="blue-fc"># {boardData.fishName}</div>
                  </div>
                )}

                {boardData.hashtags && (
                  <>
                    {boardData.hashtags.map((tag, index) => (
                      <div className="blue-bd" key={index}>
                        <div className="blue-fc "># {tag}</div>
                      </div>
                    ))}
                  </>
                )}
              </div>
              {boardData.socialId == userId && (
                <div className="btn-area">
                  <div className="btn-modify bg-blue" onClick={() => modifyPost()}>
                    수정
                  </div>
                  <div className="btn-delete bg-blue" onClick={() => deletePost()}>
                    삭제
                  </div>
                </div>
              )}
            </div>
            <div className="line bg-blue"></div>
            <div className="board-detail-item">
              <div className="board-place">Place Info</div>

              <div className="board-map">
                <BoardDetailMap lat={boardData.latitude} lng={boardData.longitude} />
              </div>
            </div>
            <div className="line bg-blue"></div>
            <div className="reply-area">
              <div className="reply-title">
                <div>댓글</div>

                <div className="blue-fc">{boardData.commentCnt}</div>
              </div>
              <div className="reply-line bg-blue"></div>
              <div className="reply-list">
                {boardData.comments && (
                  <>
                    {boardData.comments.map((comment, index) => (
                      <div className="reply" key={index}>
                        <img src={comment.profileImageUrl} alt="" />
                        <div>{comment.nickName}</div>
                        <div>{changeDate(comment.createdAt)}</div>
                        <div>{comment.content}</div>
                        {comment.socialId == userId && (
                          <span className="delete-reply blue-fc" onClick={() => deleteReply(comment.id)}>
                            x
                          </span>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="reply-add">
            <div className="reply-line bg-blue"></div>
            <img src={userInfo.imageUrl} alt="" />
            <div className="reply-add-area">
              <input type="text" value={reply} onChange={(e) => setReply(e.target.value)} onKeyDown={(e) => sendReply(e)} placeholder="댓글작성하기" />
              <div className="send-reply bg-blue">
                <SendIcon />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BoardDetail;
