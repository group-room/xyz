import Lottie from "react-lottie";
import LottieData from "../../../public/lottie/loading.json";

type Props = {
  width?: string;
  height?: string;
};

const LoadingLottie = ({ width, height }: Props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LottieData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
};
export default LoadingLottie;
