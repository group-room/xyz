import { axiosInstance } from "@/app/api/instance";
import { queryKeys } from "@/constants/queryKeys";
import { NotificationTypes } from "@/types/notification";
import { useQuery } from "@tanstack/react-query";

const NOFITICATIOM = "notification";

export const useNotifiacationList = (type: string) => {
  return useQuery<NotificationTypes[]>({
    queryKey: queryKeys.notification.notificationList(type),
    queryFn: async () => {
        return axiosInstance
        .get(NOFITICATIOM, {params: {type}})
        .then((res) => res.data.data.users);
    },
  });
};