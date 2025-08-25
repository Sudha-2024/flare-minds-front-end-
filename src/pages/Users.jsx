import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/users/others");
        setUsers(data || []);
      } catch (err) {
        console.error("Failed to load users:", err);
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="card" style={{paddingBottom:"5%", alignItems:"center"}}>
      <h2>All Users:</h2>
       {loading && <p>Loading...</p>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && (
        <div className="list">
          {users.length > 0 ? (
            users.map(u => (
              <div key={u._id} className="list-item">
                <div className="avatar">{u.avatar ? <img src={u.avatar} alt="avatar" /> : `${u.firstName[0]}${u.lastName[0]}`}</div>
                <div>
                  <div className="title">{u.firstName} {u.lastName} {u.role !== "user" && `(${u.role})`}</div>
                  <div className="sub">{u.email} · {u.mobileNumber}</div>
                </div>
              </div>
            ))
          ) : (
            <p className="muted">No other users yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
