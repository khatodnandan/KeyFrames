import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FiActivity, FiLogOut, FiSend, FiShield, FiUserCheck, FiUsers, FiUserX } from "react-icons/fi";
import Logo from "../components/Logo";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  useDocumentTitle("Admin Dashboard", "Keyframes Media admin dashboard.");

  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [insights, setInsights] = useState({
    totalUsers: 0,
    activeUsers: 0,
    blockedUsers: 0,
    recentActivities: [],
    newUsersToday: 0,
    pendingApprovals: 0,
  });
  const [activityFilter, setActivityFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [userSearch, setUserSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // ------------------ API URL ------------------
  const API_URL = process.env.REACT_APP_API_URL || "https://keyframes.onrender.com";

  // ------------------ SOCKET.IO ------------------
  useEffect(() => {
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

    socket.on("update-insights", (updated) => setInsights(updated));

    return () => socket.disconnect();
  }, [userId, API_URL]);

  // ------------------ Fetch Functions ------------------
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err.message);
    }
  };

  const fetchInsights = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/insights`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInsights(res.data);
    } catch (err) {
      console.error("Error fetching insights:", err.response?.data || err.message);
    }
  };

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
      console.error("Error fetching notifications:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await Promise.all([fetchUsers(), fetchInsights(), fetchNotifications()]);
      setLoading(false);
    })();
  }, [API_URL]);

  // ------------------ Actions ------------------
  const handleBlock = async (id) => {
    try {
      await axios.patch(
        `${API_URL}/api/admin/users/${id}/block`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
      fetchInsights();
    } catch (err) {
      console.error("Error blocking/unblocking user:", err.response?.data || err.message);
    }
  };

  const handleRoleChange = async (id, currentRole) => {
    try {
      const newRole = currentRole === "user" ? "admin" : "user";
      await axios.patch(
        `${API_URL}/api/admin/users/${id}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
      fetchInsights();
    } catch (err) {
      console.error("Error changing role:", err.response?.data || err.message);
    }
  };

  const sendNotification = async () => {
    if (!notificationMessage.trim()) return;

    setSending(true);
    try {
      const url = selectedUser
        ? `${API_URL}/api/notifications/personal/${selectedUser}`
        : `${API_URL}/api/notifications/global`;

      const res = await axios.post(
        url,
        { message: notificationMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setNotificationMessage("");
        setSelectedUser("");
        fetchNotifications();
      } else {
        console.error("Backend rejected request:", res.data);
      }
    } catch (err) {
      console.error("Error sending notification:", err.response?.data || err.message);
    } finally {
      setSending(false);
    }
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const chartData = [
    { name: "Active", value: insights.activeUsers },
    { name: "Blocked", value: insights.blockedUsers },
    { name: "New Today", value: insights.newUsersToday || 0 },
    { name: "Pending", value: insights.pendingApprovals || 0 },
  ];

  const filteredActivities = insights.recentActivities.filter((act) =>
    activityFilter === "all" ? true : act.action.toLowerCase().includes(activityFilter)
  );

  const filteredUsers = users
    .filter((u) => {
      if (userFilter === "all") return true;
      if (userFilter === "blocked") return u.isBlocked;
      return u.role === userFilter;
    })
    .filter((u) =>
      userSearch.trim()
        ? `${u.name} ${u.email}`.toLowerCase().includes(userSearch.trim().toLowerCase())
        : true
    );

  // ------------------ Render ------------------
  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="container admin-header-inner">
          <Logo size={38} />
          <div className="admin-header-actions">
            <span className="badge badge-accent">Admin</span>
            <button className="btn btn-ghost btn-sm" onClick={markAllRead}>
              Mark all read
            </button>
            <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
              <FiLogOut aria-hidden="true" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container admin-body">
        <div className="admin-title-row">
          <div>
            <span className="section-eyebrow">Overview</span>
            <h1>Admin Dashboard</h1>
          </div>
        </div>

        <section className="insights-cards">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => <div key={i} className="card kpi-skeleton" />)
          ) : (
            <>
              <div className="card kpi-card">
                <span className="kpi-icon kpi-icon--accent">
                  <FiUsers aria-hidden="true" />
                </span>
                <div>
                  <h3>Total Users</h3>
                  <p>{insights.totalUsers}</p>
                </div>
              </div>
              <div className="card kpi-card">
                <span className="kpi-icon kpi-icon--success">
                  <FiUserCheck aria-hidden="true" />
                </span>
                <div>
                  <h3>Active Users</h3>
                  <p>{insights.activeUsers}</p>
                </div>
              </div>
              <div className="card kpi-card">
                <span className="kpi-icon kpi-icon--danger">
                  <FiUserX aria-hidden="true" />
                </span>
                <div>
                  <h3>Blocked Users</h3>
                  <p>{insights.blockedUsers}</p>
                </div>
              </div>
              <div className="card kpi-card">
                <span className="kpi-icon kpi-icon--accent-2">
                  <FiActivity aria-hidden="true" />
                </span>
                <div>
                  <h3>New Today</h3>
                  <p>{insights.newUsersToday || 0}</p>
                </div>
              </div>
              <div className="card kpi-card">
                <span className="kpi-icon kpi-icon--warning">
                  <FiShield aria-hidden="true" />
                </span>
                <div>
                  <h3>Pending Approvals</h3>
                  <p>{insights.pendingApprovals || 0}</p>
                </div>
              </div>
            </>
          )}
        </section>

        <div className="admin-grid">
          <div className="admin-col-main">
            <section className="card analytics-section">
              <h2>User Analytics</h2>
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
                    <XAxis dataKey="name" stroke="#7a7a86" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#7a7a86" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{
                        background: "#16161b",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 10,
                        color: "#f6f5f2",
                      }}
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                    />
                    <Bar dataKey="value" fill="#ff5c35" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="card recent-activity-section">
              <div className="section-row">
                <h2>Recent Activity</h2>
                <select
                  className="field-select"
                  value={activityFilter}
                  onChange={(e) => setActivityFilter(e.target.value)}
                  aria-label="Filter activity by action type"
                >
                  <option value="all">All Actions</option>
                  <option value="block">Block/Unblock</option>
                  <option value="role">Role Change</option>
                </select>
              </div>

              {loading ? (
                <div className="activity-list">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="activity-skeleton" />
                  ))}
                </div>
              ) : filteredActivities.length === 0 ? (
                <p className="empty-state">No activity to show.</p>
              ) : (
                <div className="activity-list">
                  {filteredActivities.map((act) => (
                    <div key={act._id} className="activity-item">
                      <p>
                        <strong>{act.action}</strong> by <strong>{act.performedBy.name}</strong>{" "}
                        ({act.performedBy.email}) on <strong>{act.user.name}</strong> ({act.user.email})
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <div className="admin-col-side">
            <section className="card notifications-panel">
              <h2>Send Notification</h2>
              <textarea
                className="field-textarea"
                value={notificationMessage}
                onChange={(e) => setNotificationMessage(e.target.value)}
                placeholder="Enter notification message"
                aria-label="Notification message"
              />
              <select
                className="field-select"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                aria-label="Notification recipient"
              >
                <option value="">Global Notification</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name} ({u.email})
                  </option>
                ))}
              </select>
              <button
                onClick={sendNotification}
                className="btn btn-primary btn-block"
                disabled={sending || !notificationMessage.trim()}
              >
                <FiSend aria-hidden="true" /> {sending ? "Sending…" : "Send"}
              </button>

              <div className="notifications-list">
                {notifications.length === 0 ? (
                  <p className="empty-state">No notifications yet.</p>
                ) : (
                  notifications.map((n) => (
                    <div key={n._id} className={`notification-row ${n.type} ${n.read ? "" : "unread"}`}>
                      <span className="badge">{n.type === "personal" ? "Personal" : "Global"}</span>
                      <p>{n.message}</p>
                      <span className="notif-time">{new Date(n.createdAt).toLocaleString()}</span>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>

        <section className="card users-management">
          <div className="section-row">
            <h2>Users Management</h2>
            <div className="users-management-controls">
              <input
                type="search"
                className="field-input"
                placeholder="Search by name or email"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                aria-label="Search users"
              />
              <select
                className="field-select"
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                aria-label="Filter users by role or status"
              >
                <option value="all">All Users</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p className="empty-state">Loading users…</p>
          ) : filteredUsers.length === 0 ? (
            <p className="empty-state">No users match this filter.</p>
          ) : (
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td data-label="Name">{user.name}</td>
                      <td data-label="Email">{user.email}</td>
                      <td data-label="Role">
                        <span className={`badge ${user.role === "admin" ? "badge-accent" : ""}`}>{user.role}</span>
                      </td>
                      <td data-label="Status">
                        <span className={`badge ${user.isBlocked ? "badge-danger" : "badge-success"}`}>
                          {user.isBlocked ? "Blocked" : "Active"}
                        </span>
                      </td>
                      <td data-label="Actions">
                        <div className="table-actions">
                          <button className="btn btn-sm btn-secondary" onClick={() => handleBlock(user._id)}>
                            {user.isBlocked ? "Unblock" : "Block"}
                          </button>
                          <button className="btn btn-sm btn-ghost" onClick={() => handleRoleChange(user._id, user.role)}>
                            Toggle Role
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
