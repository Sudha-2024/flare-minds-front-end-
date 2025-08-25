import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");

    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [user, token]);

  // Update user function to handle avatar or other fields
  const updateUser = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  const login = async (payload) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setUser(data.user);
        setToken(data.token);
        return { ok: true, msg: "Login success" };
      } else {
        return { ok: false, msg: data.message || "Invalid credentials" };
      }
    } catch (err) {
      setLoading(false);
      return { ok: false, msg: "Server error" };
    }
  };

  const signup = async (payload) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setUser(data.user);
        setToken(data.token);
        return { ok: true, msg: "Signup success" };
      } else {
        return { ok: false, msg: data.message || "Signup failed" };
      }
    } catch (err) {
      setLoading(false);
      return { ok: false, msg: "Server error" };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
