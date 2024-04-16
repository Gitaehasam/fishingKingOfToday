import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as tmImage from "@teachablemachine/image";
import Header from "@components/Header";
import Loading from "@components/Loading";
import axios from "axios";
import "@assets/styles/fishrecognition/ImageResultPage.scss";

const URL = "/my_model/";

const ImageResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state.value;
  const imgRef = useRef(null);
  const modelRef = useRef(null);
  const [name, setName] = useState(null);
  const [fishId, setFishId] = useState(0);
  const [fishDatas, setFishDatats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getBoard = async (fishBookId) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/boards`,
        {
          params: { categoryId: 1, fishBookId },
          headers: {
            Authorization: jwt,
          },
        }
      );

      setFishDatats(res.data.boards);
    } catch (error) {
      console.log(err);
    }
  };

  const predict = async () => {
    // if (modelRef.current && imgRef.current) {

    // }
    try {
      let image = imgRef.current;
      const prediction = await modelRef.current.predict(image, false);
      prediction.sort(
        (a, b) => parseFloat(b.probability) - parseFloat(a.probability)
      );
      const classPrediction = prediction[0].className;
      const data = classPrediction.split(" ");
      setName(data[0]);
      setFishId(data[1]);
      await getBoard(data[1]);
    } catch (err) {
      console.error("Prediction error:", err);
    }
  };

  const loadModel = async () => {
    try {
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";
      const model = await tmImage.load(modelURL, metadataURL);
      modelRef.current = model;
      await predict();
    } catch (err) {
      console.error("Model loading error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const moveFishBook = () => {
    navigate(`/fishbook/${fishId}`);
  };

  const getDate = (date) => {
    const now = new Date();
    const specificDate = new Date(date);

    const diffInHours = (specificDate - now) / (1000 * 60 * 60);

    const rtf = new Intl.RelativeTimeFormat("ko-KR");

    let relativeTime;

    if (Math.abs(diffInHours) < 24) {
      // 시간 단위로 변환
      relativeTime = rtf.format(Math.round(diffInHours), "hour");
    } else {
      // 일 단위로 변환
      relativeTime = rtf.format(Math.round(diffInHours / 24), "day");
    }

    return relativeTime;
  };

  useEffect(() => {
    loadModel();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <div className="result" style={{ display: isLoading && "none" }}>
        <Header centerText={"분석완료"} align="center" />
        <div className="result-body">
          <div className="result-img">
            <img
              className="ml-result"
              src={result}
              ref={imgRef}
              alt="물고기 사진"
            />
          </div>
          <div className="result-content">
            <div className="result-fish blue-bd" onClick={moveFishBook}>
              <div className="result-name blue-fc">{name}</div>
              <div className="result-detail blue-fc">자세히 보기</div>
            </div>
            <div className="fish-reviews">
              <h3 className="reviews-title">{name}의 리뷰</h3>
              {fishDatas.length ? (
                <div className="board">
                  {fishDatas.map((review) => {
                    return (
                      <div
                        key={review.boardId}
                        className="review"
                        onClick={() =>
                          navigate(`/media/board/${review.boardId}`)
                        }
                      >
                        <img
                          src={review.boardImageUrl}
                          className="review-img"
                        />
                        <div className="review-user">
                          <img
                            src={review.profileImageUrl || default_img}
                            alt=""
                          />
                          <div>{review.nickName}</div>
                        </div>
                        <div className="review-date">
                          {getDate(review.createdAt)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="none-data">정보를 준비 중입니다.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageResultPage;
