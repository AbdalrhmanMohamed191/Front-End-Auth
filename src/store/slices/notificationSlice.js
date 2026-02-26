// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import { getNotifications, getUnreadCount, markAsRead } from "../../components/Notifications/Notifications";
// import { getNotifications, getUnreadCount, markAsRead } from "../../apis/api";

// export const fetchNotifications = createAsyncThunk(
//   "notifications/fetch",
//   async () => {
//     const res = await getNotifications();
//     return res.data.notifications;
//   }
// );

// export const fetchUnreadCount = createAsyncThunk(
//   "notifications/unread",
//   async () => {
//     const res = await getUnreadCount();
//     return res.data.count;
//   }
// );

// export const readNotification = createAsyncThunk(
//   "notifications/read",
//   async (id) => {
//     await markAsRead(id);
//     return id;
//   }
// );

// const notificationSlice = createSlice({
//   name: "notifications",
//   initialState: {
//     list: [],
//     unreadCount: 0,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchNotifications.fulfilled, (state, action) => {
//         state.list = action.payload;
//       })
//       .addCase(fetchUnreadCount.fulfilled, (state, action) => {
//         state.unreadCount = action.payload;
//       })
//       .addCase(readNotification.fulfilled, (state, action) => {
//         state.list = state.list.map((n) =>
//           n._id === action.payload ? { ...n, isRead: true } : n
//         );
//         state.unreadCount -= 1;
//       });
//   },
// });

// export default notificationSlice.reducer;
