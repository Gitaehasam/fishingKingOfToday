import "../assets/styles/Loading.scss";
import Lottie from "react-lottie";
import animationData from "@assets/lottie/Animation - 1707353148624.json";

const Loading = ({ hidden }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="dot-spinner" style={{ display: hidden && "none" }}>
      <Lottie options={defaultOptions} speed={1.5} />
    </div>
  );
};

export default Loading;
