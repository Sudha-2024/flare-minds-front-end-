import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="nav">
      <div className="brand">Flare Minds</div>

      <div className="links">
        {user && (
          <>
            <Link to="/">Home</Link>
            <Link to="/users">Users</Link>
          </>
        )}
      </div>

      <div className="right">
        {user ? (
          <>
            <div
              className="welcome"
              style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
              onClick={() => navigate("/profile")}
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="avatar"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    objectFit: "cover"
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    background: "#ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    color: "#fff"
                  }}
                >
                  {user.firstName[0]}
                </div>
              )}
              <span>Hi, {user.firstName}</span>
            </div>

            <button
              onClick={async () => {
                await logout();
                navigate("/login");
              }}
              className="btn"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="btn">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
