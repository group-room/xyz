import axios from "axios";

export const convertAddress = async (x: string, y: string) => {
  const res = await axios.get(
    "https://dapi.kakao.com/v2/local/geo/coord2address",
    {
      params: { x, y },
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
    }
  );
  return res;
};
