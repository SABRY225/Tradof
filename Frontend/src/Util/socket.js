import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_REALTIME_URL; // تأكد أن هذا هو العنوان الصحيح للخادم

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});
