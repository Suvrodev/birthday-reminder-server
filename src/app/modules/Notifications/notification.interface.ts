export interface INotification {
  _id?: string; // MongoDB automatically
  friendId: string; // kon friend er jonno
  name: string; // friend name
  date: string | Date; // friend birthday
  ref: string; // owner user email
  remain: number; // days until birthday
  isRead?: boolean; // default false
  createdAt?: string | Date; // default Date.now
}
