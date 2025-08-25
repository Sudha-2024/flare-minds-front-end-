import { useAuth } from "../context/AuthContext";
import { useState, useRef } from "react";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        updateUser({ avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="card"
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
      }}
    >
      {/* Centered heading, avatar, upload */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "15px" }}>My Profile</h2>
        <img
          src={avatarPreview || "https://via.placeholder.com/100"}
          alt="avatar"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "10px",
          }}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <button
          className="btn"
          onClick={() => fileInputRef.current.click()}
        >
          Upload Avatar
        </button>
      </div>

      {/* Left-aligned user info */}
      <div style={{ textAlign: "left" }}>
        <p><strong>First Name:</strong> {user.firstName}</p>
        <p><strong>Last Name:</strong> {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile:</strong> {user.mobileNumber}</p>
      </div>
    </div>
  );
}
