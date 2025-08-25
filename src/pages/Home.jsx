import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="container" style={{padding:"25%", alignItems:"center"}}>
    <div className="card center">
      <h1>Welcome, {user?.firstName}</h1>
      <p>You're logged in 🎉</p>
    </div>
    </div>
  );
}
