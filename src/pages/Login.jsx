import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("email");
  const [form, setForm] = useState({ email: "", mobileNumber: "", password: "" });
  const [error, setError] = useState("");

  const handleTab = (newTab) => {
    setTab(newTab);
    setError("");
    setForm({ email: "", mobileNumber: "", password: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    const payload = tab === "email" ? { email: form.email, password: form.password } 
                                     : { mobileNumber: form.mobileNumber, password: form.password };
    const res = await login(payload);
    if (!res.ok) setError(res.msg);
    else navigate("/");
  };

  return (
    <div className="card">
      <h2 style={{ textAlign:"center"}}>Login</h2>
      <div className="tabs">
        <button className={tab==="email"?"active":""} onClick={()=>handleTab("email")}>Email</button>
        <button className={tab==="mobile"?"active":""} onClick={()=>handleTab("mobile")}>Mobile</button>
      </div>
      <form onSubmit={submit} className="form">
        {tab === "email" ? (
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required/>
        ) : (
          <input type="text" name="mobileNumber" placeholder="Mobile (10 digits)" value={form.mobileNumber} onChange={handleChange} required/>
        )}
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required/>
        {error && <div className="error">{error}</div>}
        <button className="btn" disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
        <p style={{ textAlign:"center"}} className="muted">No account? <Link to="/signup">Create one</Link></p>
      </form>
    </div>
  );
}
