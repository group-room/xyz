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

// 주소를 좌표로 변환 : x = longitude, y = latitude
export const convertAddressToCoordinate = async (query: string) => {
  console.log("address -> ", query)
  // const query = encodeURI(encodeURIComponent(add))
  const res = await axios.get(
    "https://dapi.kakao.com/v2/local/search/address.json",
    {
      params: { query },
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
    }
  );
  return res.data.documents[0].address;
};
