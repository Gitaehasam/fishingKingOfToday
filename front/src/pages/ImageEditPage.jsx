import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Cropper } from "react-cropper";
import "../assets/styles/FishRecognition/ImageEditPage.scss";
import "cropperjs/dist/cropper.css";
import Aspect from "../components/FishRecognition/Aspect";
import { IoIosArrowBack } from "react-icons/io";
import loginImg from "../assets/images/login_img.png";

function ImageEditPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const number = location.state.value;
  const cropperRef = useRef(null);
  console.log(number);

  const getCropData = () => {
    navigate("/fish/image/result", {
      state: {
        value: cropperRef.current?.cropper.getCroppedCanvas().toDataURL(),
      },
    });
  };

  return (
    <div className="Demo">
      <div className="Demo_header">
        <IoIosArrowBack onClick={() => navigate("/")} />
        <div onClick={getCropData}>자르기</div>
      </div>
      <div className="Demo_body">
        <Cropper
          ref={cropperRef}
          style={{
            // height: "90%",
            width: "85%",
            // margin: "30px",
            // display: "flex",
            // justifyContent: "center",
          }}
          modal={true}
          dragMode="none"
          viewMode={1}
          highlight={false}
          background={false}
          autoCropArea={1}
          // aspectRatio={aspect}
          // rotatable={false}
          // initialAspectRatio={1}
          // modal={true}
          // restore={false}
          // responsive={false}
          // zoomTo={0.5}
          // rotateTo={10}
          src={number}
          checkOrientation={true}
        />
      </div>
      <div className="Demo_footer">
        <Aspect cropperRef={cropperRef} />
      </div>
    </div>
  );
}

export default ImageEditPage;
