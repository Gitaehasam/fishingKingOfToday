import { useState } from "react";
import "../../assets/styles/FishRecognition/Aspect.scss";
import { FaCheck } from "react-icons/fa";

const Aspect = ({ cropperRef }) => {
  const [check, setCheck] = useState(1);

  return (
    <div className="Aspect">
      <div className="Aspect_header">
        <div
          className={`Aspect_length ${check && "active"}`}
          onClick={() => setCheck(1)}
        >
          <FaCheck style={{ color: "#191919" }} />
        </div>
        <div
          className={`Aspect_width ${!check && "active"}`}
          onClick={() => setCheck(0)}
        >
          <FaCheck style={{ color: "#191919" }} />
        </div>
      </div>
      <div className="Aspect_body">
        <button onClick={() => cropperRef.current.cropper.setAspectRatio(NaN)}>
          원본
        </button>
        <button onClick={() => cropperRef.current.cropper.setAspectRatio(1)}>
          1:1
        </button>
        {!check ? (
          <>
            <button
              onClick={() => cropperRef.current.cropper.setAspectRatio(4 / 3)}
            >
              4:3
            </button>
            <button
              onClick={() => cropperRef.current.cropper.setAspectRatio(16 / 9)}
            >
              16:9
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => cropperRef.current.cropper.setAspectRatio(3 / 4)}
            >
              3:4
            </button>
            <button
              onClick={() => cropperRef.current.cropper.setAspectRatio(9 / 16)}
            >
              9:16
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Aspect;
