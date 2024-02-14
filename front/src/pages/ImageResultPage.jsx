import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as tmImage from "@teachablemachine/image";
import { IoIosArrowBack, IoIosInformationCircleOutline } from "react-icons/io";
import Header from "../components/Header";
import Loading from "../components/Loading";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
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
  const [getInfo, setGetInfo] = useState(false);

  const predict = async () => {
    console.log(modelRef.current);
    console.log(imgRef.current);
    if (modelRef.current && imgRef.current) {
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
      } catch (err) {
        console.error("Prediction error:", err);
      }
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
    }
  };

  const moveFishBook = () => {
    navigate(`/fishbook/${fishId}`);
  };

  useEffect(() => {
    loadModel();

    return () => {
      imgRef.current = null;
    };
  }, []);

  // if (!name) {
  //   return <Loading />;
  // }

  return (
    <>
      <div className="result" style={{ display: !name && "none" }}>
        <Header centerText={"분석완료"} align="center" />
        <div className="result-body">
          <div className="result-img">
            <img className="ml-result" src={result} ref={imgRef} alt="" />
          </div>
          <div className="result-content">
            <div className="result-fish" onClick={moveFishBook}>
              <div className="result-name">{name}</div>
              <div className="result-detail">자세히 보기</div>
            </div>
            <div className="fish-reviews">
              <h3 className="reviews-title">{name}의 리뷰</h3>
              <div className="wrapper">
                {fishDatas.length ? (
                  fishDatas.map((review) => {
                    return (
                      <div>
                        <img
                          key={review}
                          src="https://cdn.iconsumer.or.kr/news/photo/201806/7349_8772_1719.jpg"
                        />
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
      <Loading hidden={name} />
    </>
  );
};

export default ImageResultPage;
