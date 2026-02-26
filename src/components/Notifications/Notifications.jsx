// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchNotifications,
//   fetchUnreadCount,
//   readNotification,
// } from "../../store/slices/notificationSlice";
// import { Dropdown, Badge } from "react-bootstrap";


// export const Notifications = () => {
//   const dispatch = useDispatch();
//   const { list, unreadCount } = useSelector(
//     (state) => state.notifications
//   );

//   useEffect(() => {
//     dispatch(fetchNotifications());
//     dispatch(fetchUnreadCount());
//   }, [dispatch]);

//   return (
//     <Dropdown align="end">
//       <Dropdown.Toggle variant="light" className="position-relative">
//         🔔
//         {unreadCount > 0 && (
//           <Badge bg="danger" pill className="position-absolute top-0 start-100">
//             {unreadCount}
//           </Badge>
//         )}
//       </Dropdown.Toggle>

//       <Dropdown.Menu style={{ width: 320 }}>
//         {list.length === 0 && (
//           <Dropdown.Item className="text-center text-muted">
//             No notifications
//           </Dropdown.Item>
//         )}

//         {list.map((n) => (
//           <Dropdown.Item
//             key={n._id}
//             onClick={() => dispatch(readNotification(n._id))}
//             style={{
//               background: n.isRead ? "#fff" : "#f0f8ff",
//               fontWeight: n.isRead ? "normal" : "bold",
//             }}
//           >
//             <div>
//               <strong>{n.sender?.username}</strong>{" "}
//               {n.type === "like" && "liked your post"}
//               {n.type === "comment" && "commented on your post"}
//               {n.type === "follow" && "started following you"}
//             </div>
//           </Dropdown.Item>
//         ))}
//       </Dropdown.Menu>
//     </Dropdown>
//   );
// };

// export default Notifications;


