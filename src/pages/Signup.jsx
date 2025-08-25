import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    const res = await signup(form);
    if (!res.ok) setError(res.msg);
    else {
      alert("User created successfully!");
      navigate("/login"); // redirect to login after signup
    }
  };

  return (
    <div className="card">
      <h2 style={{ textAlign:"center"}}>Create Account</h2>
      <form onSubmit={submit} className="form">
        <input name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} required />
        <input name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} required />
        <input name="mobileNumber" placeholder="Mobile (10 digits)" value={form.mobileNumber} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password (min 6)" value={form.password} onChange={handleChange} required />
        {error && <div className="error">{error}</div>}
        <button className="btn" disabled={loading}>{loading ? "Creating..." : "Sign Up"}</button>
        <p className="muted" style={{ textAlign:"center"}}>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
