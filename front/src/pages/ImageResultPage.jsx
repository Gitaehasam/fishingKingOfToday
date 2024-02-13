import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as tmImage from "@teachablemachine/image";
import Header from "../components/Header";
import Loading from "../components/Loading";
import "@assets/styles/fishrecognition/ImageResultPage.scss";

const URL = "/my_model/";

const ImageResultPage = () => {
  const location = useLocation();
  const result = location.state?.value;
  const modelRef = useRef(null);
  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [fishDatas, setFishDatas] = useState([]);
  const [getInfo, setGetInfo] = useState(false);

  const predict = async () => {
    const image = new Image();
    image.src = result;
    const prediction = await modelRef.current.predict(image, false);
    prediction.sort(
      (a, b) => parseFloat(b.probability) - parseFloat(a.probability)
    );
    return prediction[0].className;
  };

  const loadModel = async () => {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    return await tmImage.load(modelURL, metadataURL);
  };

  const handleLoadAndPredict = async () => {
    try {
      const model = await loadModel();
      modelRef.current = model;
      const name = await predict();
      setName(name);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    if (!result) {
      navigate("/");
    }

    handleLoadAndPredict();
  }, []);

  if (!name) {
    return <Loading />;
  }

  return (
    <>
      <div className="result">
        <Header centerText={"분석완료"} align="center" />
        <div className="result-body">
          <div className="result-img">
            <img className="ml-result" src={result} alt="" />
          </div>
          <div className="result-content">
            <div className="result-fish">
              <div className="result-name">{name}</div>
              <div className="result-detail">자세히 보기</div>
            </div>
            <div className="fish-reviews">
              <h3 className="reviews-title">{name}의 리뷰</h3>
              <div className="wrapper">
                {fishDatas.length ? (
                  fishDatas.map((review) => {
                    return (
                      <div key={review}>
                        <img src="https://cdn.iconsumer.or.kr/news/photo/201806/7349_8772_1719.jpg" />
                        <div>{review}</div>
                      </div>
                    );
                  })
                ) : (
                  <div className="none-data">정보를 준비 중입니다.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageResultPage;
