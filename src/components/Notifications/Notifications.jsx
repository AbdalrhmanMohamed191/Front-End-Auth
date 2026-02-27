// // // import { useEffect, useState } from "react";
// // // import { Container, Card, ListGroup, Button, Badge, Spinner } from "react-bootstrap";
// // // import toast from "react-hot-toast";
// // // import { api } from "../../apis/api";

// // // const Notifications = () => {
// // //   const [notifications, setNotifications] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [unreadCount, setUnreadCount] = useState(0);

// // //   // =========================
// // //   // Fetch notifications + unread count
// // //   // =========================
// // //   const fetchNotifications = async () => {
// // //     try {
// // //       const notifRes = await api.get("/notifications");
// // //       const countRes = await api.get("/notifications/unread-count");

// // //       setNotifications(notifRes.data.notifications);
// // //       setUnreadCount(countRes.data.count);
// // //     } catch (err) {
// // //       console.error("Failed to load notifications", err);
// // //       toast.error("Failed to load notifications");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchNotifications();

// // //     // polling كل 10 ثواني لتحديث الإشعارات تلقائي
// // //     const interval = setInterval(() => {
// // //       fetchNotifications();
// // //     }, 10000);

// // //     return () => clearInterval(interval);
// // //   }, []);

// // //   // =========================
// // //   // Mark notification as read
// // //   // =========================
// // //   const markAsRead = async (id) => {
// // //     try {
// // //       await api.patch(`/notifications/${id}/read`);
// // //       // تحديث state مباشرة بدون إعادة fetch كامل
// // //       setNotifications((prev) =>
// // //         prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
// // //       );
// // //       setUnreadCount((prev) => Math.max(prev - 1, 0));
// // //     } catch (err) {
// // //       console.error(err);
// // //       toast.error("Failed to mark as read");
// // //     }
// // //   };

// // //   // =========================
// // //   // Delete notification
// // //   // =========================
// // //   const deleteNotification = async (id) => {
// // //     try {
// // //       await api.delete(`/notifications/${id}`);
// // //       setNotifications((prev) => prev.filter((n) => n._id !== id));
// // //       // إعادة حساب unread count بعد الحذف
// // //       const unread = notifications.filter((n) => !n.isRead && n._id !== id).length;
// // //       setUnreadCount(unread);
// // //     } catch (err) {
// // //       console.error(err);
// // //       toast.error("Failed to delete notification");
// // //     }
// // //   };

// // //   if (loading)
// // //     return (
// // //       <Container className="d-flex justify-content-center align-items-center min-vh-100">
// // //         <Spinner animation="border" />
// // //       </Container>
// // //     );

// // //   return (
// // //     <Container className="d-flex justify-content-center align-items-start min-vh-100 bg-light py-5">
// // //       <Card className="shadow-lg border-0 rounded-4" style={{ width: "100%", maxWidth: "500px" }}>
// // //         <Card.Body className="p-4">
// // //           <h2 className="fw-bold mb-3">
// // //             Notifications{" "}
// // //             {unreadCount > 0 && <Badge bg="danger" pill>{unreadCount}</Badge>}
// // //           </h2>

// // //           <ListGroup variant="flush">
// // //             {notifications.length === 0 && (
// // //               <ListGroup.Item className="text-center">
// // //                 No notifications
// // //               </ListGroup.Item>
// // //             )}

// // //             {notifications.map((n) => (
// // //               <ListGroup.Item
// // //                 key={n._id}
// // //                 className={`d-flex justify-content-between align-items-center ${
// // //                   n.isRead ? "" : "fw-bold bg-light"
// // //                 }`}
// // //               >
// // //                 <div>
// // //                   <strong>{n.sender.username}</strong> {n.type} your {n.postId ? "post" : "profile"}
// // //                 </div>
// // //                 <div>
// // //                   {!n.isRead && (
// // //                     <Button
// // //                       variant="success"
// // //                       size="sm"
// // //                       className="me-1"
// // //                       onClick={() => markAsRead(n._id)}
// // //                     >
// // //                       ✔
// // //                     </Button>
// // //                   )}
// // //                   <Button
// // //                     variant="danger"
// // //                     size="sm"
// // //                     onClick={() => deleteNotification(n._id)}
// // //                   >
// // //                     🗑️
// // //                   </Button>
// // //                 </div>
// // //               </ListGroup.Item>
// // //             ))}
// // //           </ListGroup>
// // //         </Card.Body>
// // //       </Card>
// // //     </Container>
// // //   );
// // // };

// // // export default Notifications;



// // import { useEffect, useState } from "react";
// // import { io } from "socket.io-client";
// // import { Container, Card, ListGroup, Button, Badge, Spinner } from "react-bootstrap";
// // import toast from "react-hot-toast";
// // import { api } from "../../apis/api"; // axios instance مع baseURL و token

// // const Notifications = ({ userId }) => {
// //   const [notifications, setNotifications] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [unreadCount, setUnreadCount] = useState(0);

// //   // =========================
// //   // Fetch notifications + unread count
// //   // =========================
// //   const fetchNotifications = async () => {
// //     try {
// //       const notifRes = await api.get("/api/v1/notifications"); // المسار الصحيح
// //       const countRes = await api.get("/api/v1/notifications/unread-count");

// //       setNotifications(notifRes.data.notifications);
// //       setUnreadCount(countRes.data.count);
// //     } catch (err) {
// //       console.error("Failed to load notifications", err);
// //       toast.error("Failed to load notifications");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchNotifications();
// //   }, []);

// //   // =========================
// //   // Socket.io real-time updates
// //   // =========================
// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     if (!token) return;

// //     const socket = io("http://localhost:5000", {
// //       auth: { token, userId },
// //     });

// //     socket.on("connect", () => console.log("Connected to socket"));
// //     socket.on("newNotification", (notif) => {
// //       setNotifications((prev) => [notif, ...prev]);
// //       setUnreadCount((prev) => prev + 1);
// //     });

// //     return () => socket.disconnect();
// //   }, [userId]);

// //   // =========================
// //   // Mark as read
// //   // =========================
// //   const markAsRead = async (id) => {
// //     try {
// //       await api.patch(`/api/v1/notifications/${id}/read`);
// //       setNotifications((prev) =>
// //         prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
// //       );
// //       setUnreadCount((prev) => Math.max(prev - 1, 0));
// //     } catch (err) {
// //       console.error(err);
// //       toast.error("Failed to mark as read");
// //     }
// //   };

// //   // =========================
// //   // Delete notification
// //   // =========================
// //   const deleteNotification = async (id) => {
// //     try {
// //       await api.delete(`/api/v1/notifications/${id}`);
// //       setNotifications((prev) => prev.filter((n) => n._id !== id));
// //       const unread = notifications.filter((n) => !n.isRead && n._id !== id).length;
// //       setUnreadCount(unread);
// //     } catch (err) {
// //       console.error(err);
// //       toast.error("Failed to delete notification");
// //     }
// //   };

// //   if (loading)
// //     return (
// //       <Container className="d-flex justify-content-center align-items-center min-vh-100">
// //         <Spinner animation="border" />
// //       </Container>
// //     );

// //   return (
// //     <Container className="d-flex justify-content-center align-items-start min-vh-100 bg-light py-5">
// //       <Card className="shadow-lg border-0 rounded-4" style={{ width: "100%", maxWidth: "500px" }}>
// //         <Card.Body className="p-4">
// //           <h2 className="fw-bold mb-3">
// //             Notifications{" "}
// //             {unreadCount > 0 && <Badge bg="danger" pill>{unreadCount}</Badge>}
// //           </h2>

// //           <ListGroup variant="flush">
// //             {notifications.length === 0 && (
// //               <ListGroup.Item className="text-center">No notifications</ListGroup.Item>
// //             )}

// //             {notifications.map((n) => (
// //               <ListGroup.Item
// //                 key={n._id}
// //                 className={`d-flex justify-content-between align-items-center ${n.isRead ? "" : "fw-bold bg-light"}`}
// //               >
// //                 <div>
// //                   <strong>{n.sender?.username || "User"}</strong> {n.type} your {n.postId ? "post" : "profile"}
// //                 </div>
// //                 <div>
// //                   {!n.isRead && (
// //                     <Button variant="success" size="sm" className="me-1" onClick={() => markAsRead(n._id)}>
// //                       ✔
// //                     </Button>
// //                   )}
// //                   <Button variant="danger" size="sm" onClick={() => deleteNotification(n._id)}>
// //                     🗑️
// //                   </Button>
// //                 </div>
// //               </ListGroup.Item>
// //             ))}
// //           </ListGroup>
// //         </Card.Body>
// //       </Card>
// //     </Container>
// //   );
// // };

// // export default Notifications;

// import { useEffect, useState } from "react";
// import { Card, ListGroup, Badge } from "react-bootstrap";
// import { api } from "../../apis/api";
// import { io } from "socket.io-client";
// import { useSelector } from "react-redux";

// const socket = io("http://localhost:5000");

// const Notifications = () => {
//   const { user } = useSelector(state => state.user);
//   const [notifications, setNotifications] = useState([]);

//   // fetch old notifications
//   useEffect(() => {
//     async function fetchNotifications() {
//       const res = await api.get("/api/v1/notifications");
//       setNotifications(res.data.notifications);
//     }
//     fetchNotifications();
//   }, []);

//   // socket realtime
//   useEffect(() => {
//     if (!user?._id) return;

//     socket.emit("joinRoom", user._id);

//     socket.on("newNotification", (notification) => {
//       console.log("NEW NOTIFICATION:", notification);
//       setNotifications(prev => [notification, ...prev]);
//     });

//     return () => {
//       socket.off("newNotification");
//     };
//   }, [user]);

//   return (
//     <Card>
//       <Card.Header>
//         Notifications <Badge bg="primary">{notifications.length}</Badge>
//       </Card.Header>

//       <ListGroup variant="flush">
//         {notifications.map(n => (
//           <ListGroup.Item key={n._id}>
//             <strong>{n.sender?.username}</strong>{" "}
//             {n.type === "like" && "liked your post"}
//             {n.type === "comment" && "commented on your post"}
//           </ListGroup.Item>
//         ))}
//       </ListGroup>
//     </Card>
//   );
// };

// export default Notifications;

// import { useEffect, useState } from "react";
// import { Card, ListGroup, Badge } from "react-bootstrap";
// import { api } from "../../apis/api";
// import { errorHandler } from "../../utils/errorHandler";

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     async function fetchNotifications() {
//       try {
//         const res = await api.get("/api/v1/notifications");
//         setNotifications(res.data.notifications || []);
//       } catch (error) {
//         errorHandler(error);
//       }
//     }

//     fetchNotifications();
//   }, []);

//   return (
//     <Card>
//       <Card.Header>
//         Notifications{" "}
//         <Badge bg="primary">{notifications.length}</Badge>
//       </Card.Header>

//       <ListGroup variant="flush">
//         {notifications.length === 0 && (
//           <ListGroup.Item>No notifications yet</ListGroup.Item>
//         )}

//         {notifications.map((n) => (
//           <ListGroup.Item key={n._id}>
//             <strong>{n.sender?.username}</strong>{" "}
//             {n.type === "like" && "liked your post"}
//             {n.type === "comment" && "commented on your post"}
//             {n.type === "follow" && "started following you"}
//           </ListGroup.Item>
//         ))}
//       </ListGroup>
//     </Card>
//   );
// };

// export default Notifications;



// import { useEffect, useState } from "react";
// import { Card, ListGroup, Badge, Spinner, Alert } from "react-bootstrap";
// import { api } from "../../apis/api";

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function fetchNotifications() {
//       setLoading(true);
//       setError("");
//       try {
//         const res = await api.get("/api/v1/notifications"); // تأكد إن baseURL في api هو /api/v1
//         console.log("NOTIFICATIONS RESPONSE:", res.data.notifications); // DEBUG

//         if (res.data.notifications && res.data.notifications.length > 0) {
//           setNotifications(res.data.notifications);
//         } else {
//           setNotifications([]);
//         }
//       } catch (err) {
//         console.error("FETCH NOTIFICATIONS ERROR:", err);
//         setError(
//           err.response?.data?.message || "Something went wrong fetching notifications"
//         );
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchNotifications();
//   }, []);

//   if (loading) return <Spinner animation="border" className="mt-3" />;

//   if (error) return <Alert variant="danger" className="mt-3">{error}</Alert>;

//   return (
//     <Card className="mt-3">
//       <Card.Header>
//         Notifications <Badge bg="primary">{notifications.length}</Badge>
//       </Card.Header>

//       <ListGroup variant="flush">
//         {notifications.length === 0 && (
//           <ListGroup.Item>No notifications yet</ListGroup.Item>
//         )}

//         {notifications.map((n) => (
//           <ListGroup.Item key={n._id}>
//             <strong>{n.sender?.username || "Unknown"}</strong>{" "}
//             {n.type === "like" && "liked your post"}
//             {n.type === "comment" && "commented on your post"}
//             {n.type === "follow" && "started following you"}
//           </ListGroup.Item>
//         ))}
//       </ListGroup>
//     </Card>
//   );
// };

// export default Notifications;