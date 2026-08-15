import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { FiBell, FiGlobe, FiUser } from "react-icons/fi";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "../styles/notifications.css";

export default function Notifications() {
  useDocumentTitle("Notifications", "Your Keyframes Media notifications.");

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const API_URL = process.env.REACT_APP_API_URL || "https://keyframes.onrender.com";

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/notifications/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        const sorted = res.data.notifications.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotifications(sorted);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const socket = io(API_URL, { withCredentials: true, transports: ["websocket"] });
    socket.emit("register-user", userId);

    socket.on("new-notification", (notification) => {
      if (
        notification.type === "global" ||
        (notification.type === "personal" && notification.user?.toString() === userId)
      ) {
        setNotifications((prev) => {
          if (prev.some((n) => n._id === notification._id)) return prev;
          return [notification, ...prev];
        });
      }
    });

    return () => socket.disconnect();
  }, [userId, API_URL]);

  return (
    <div className="notifications-page">
      <section className="section notifications-hero">
        <div className="container">
          <span className="section-eyebrow">Updates</span>
          <h1>Notifications</h1>

          {loading ? (
            <div className="notifications-list">
              {[0, 1, 2].map((i) => (
                <div key={i} className="card notification-skeleton" aria-hidden="true" />
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <div className="notifications-empty">
              <FiBell aria-hidden="true" />
              <p>No notifications yet — you're all caught up.</p>
            </div>
          ) : (
            <div className="notifications-list">
              {notifications.map((notif) => (
                <div key={notif._id} className={`card notification-card ${notif.type}`}>
                  <span className="notification-icon">
                    {notif.type === "personal" ? <FiUser aria-hidden="true" /> : <FiGlobe aria-hidden="true" />}
                  </span>
                  <div>
                    <p className="notification-message">{notif.message}</p>
                    <span className="notification-time">
                      {new Date(notif.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
