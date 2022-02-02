export interface Notification {
  _id: string;
  senderId: string;
  receiverId: string;
  senderPhoto: string;
  title: string;
  type: string;
  description: string;
  read: boolean;
  date: {
    month: number;
    day: number;
    year: number;
  };
}
