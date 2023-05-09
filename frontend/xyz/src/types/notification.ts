export type NotificationTypes = {
  type: string;
	notificationSeq: number;
	userSeq: number;
	targetSeq?: number;
	content: string;
	fromUserName?: string;
	isReceived: boolean;
};
