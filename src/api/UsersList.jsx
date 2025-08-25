import { useEffect, useState } from "react";
import api from "../api/axios";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      {error && <div className="error">{error}</div>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.firstName} {user.lastName} — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
