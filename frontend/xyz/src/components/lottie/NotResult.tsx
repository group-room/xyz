import Lottie from "react-lottie";
import LottieData from "../../../public/lottie/search_empty.json";

type Props = {
  width?: string;
  height?: string;
};

const NotResultLottie = ({ width, height }: Props) => {
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
export default NotResultLottie;
