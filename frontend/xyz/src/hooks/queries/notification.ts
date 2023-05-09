import { axiosInstance } from "@/app/api/instance";
import { API, queryKeys } from "@/constants/queryKeys";
import { NotificationTypes } from "@/types/notification";
import { useQuery } from "@tanstack/react-query";

const NOTIFICATION:string = API.notification;

export const useNotifiacationList = (type: string) => {
  return useQuery<NotificationTypes[]>({
    queryKey: queryKeys.notification.notificationList(type),
    queryFn: async () => {
        return axiosInstance
        .get(NOTIFICATION, { params: { type } })
        .then((res) => res.data.data.notifications);
    },
  });
};