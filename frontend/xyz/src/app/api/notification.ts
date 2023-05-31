import { API } from "@/constants/queryKeys";
import { axiosInstance } from "./instance";

const NOTIFICATION:string = `/${API.notification}`;


// 알림 삭제
export const deleteNotification = (notificationSeq: number) => {
  return axiosInstance.delete(`${NOTIFICATION}/${notificationSeq}`);
};