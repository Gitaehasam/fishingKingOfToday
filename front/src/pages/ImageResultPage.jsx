import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as tmImage from "@teachablemachine/image";
import "../assets/styles/FishRecognition/ImageResultPage.scss";
import { IoIosArrowBack, IoIosInformationCircleOutline } from "react-icons/io";

const URL = "./my_model/";

const ImageResultPage = () => {
  const location = useLocation();
  const result = location.state.value;
  const navigate = useNavigate();
  const imgRef = useRef(null);
  const modelRef = useRef(null);
  const [name, setName] = useState(null);

  const predict = async () => {
    if (modelRef.current && imgRef.current) {
      try {
        let image = imgRef.current;
        const prediction = await modelRef.current.predict(image, false);
        prediction.sort(
          (a, b) => parseFloat(b.probability) - parseFloat(a.probability)
        );
        const classPrediction = prediction[0].className;
        setName(classPrediction);
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
      console.log(modelRef.current);
      await predict();
    } catch (err) {
      console.error("Model loading error:", err);
    }
  };

  useEffect(() => {
    loadModel();

    return () => {
      imgRef.current = null;
    };
  }, []);

  return (
    <div className="Result">
      <div className="Result_header">
        <IoIosArrowBack onClick={() => navigate("/")} />
        <div>분석완료</div>
        <IoIosInformationCircleOutline />
      </div>
      <div className="Result_body">
        <img className="ml_result" src={result} ref={imgRef} alt="" />
      </div>
      <div className="Result_footer">
        <div className="Result_fish">{name}</div>
        <div className="Result_detail">도감보러가기</div>
      </div>
    </div>
  );
};

export default ImageResultPage;
