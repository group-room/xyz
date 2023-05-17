import Lottie from "react-lottie";
import LottieData from "../../../public/lottie/loading.json";

const LoadingLottie = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LottieData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <div><Lottie options={defaultOptions} height="80%" width="80%" /></div>;
};
export default LoadingLottie;
