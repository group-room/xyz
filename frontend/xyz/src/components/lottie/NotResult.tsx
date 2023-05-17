import Lottie from "react-lottie";
import LottieData from "../../../public/lottie/search_empty.json";

const NotResultLottie = () => {
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
export default NotResultLottie;
