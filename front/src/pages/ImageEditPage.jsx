import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Cropper } from "react-cropper";
import "../assets/styles/fishrecognition/ImageEditPage.scss";
import "cropperjs/dist/cropper.css";
import Aspect from "../components/fishrecognition/Aspect";
import { IoIosArrowBack } from "react-icons/io";
import loginImg from "../assets/images/login_img.png";
import back from "@assets/images/backSymbol.svg";
import Header from "../components/Header";

function ImageEditPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const number = location.state.value;
  const cropperRef = useRef(null);
  console.log(number);

  const getCropData = () => {
    navigate("/fish/image/result", {
      replace: true,
      state: {
        value: cropperRef.current?.cropper.getCroppedCanvas().toDataURL(),
      },
    });
  };

  return (
    <div className="Demo">
      <Header filter="invert(1)" />
      <div className="crop" onClick={getCropData}>
        자르기
      </div>
      <div className="Demo_body">
        <Cropper
          ref={cropperRef}
          style={{
            height: "100%",
            width: "100%",
          }}
          dragMode="none"
          viewMode={1}
          highlight={false}
          background={false}
          autoCropArea={1}
          minCropBoxWidth={150}
          minCropBoxHeight={150}
          src={number}
        />
      </div>
      <div className="Demo_footer">
        <Aspect cropperRef={cropperRef} />
      </div>
    </div>
  );
}

export default ImageEditPage;
