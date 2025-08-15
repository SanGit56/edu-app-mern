import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setIsValid(false);
      return;
    }

    const verifyToken = async () => {
      try {
        await axios.get("http://localhost:5000/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsValid(true);
      } catch {
        localStorage.removeItem("token");
        setIsValid(false);
      }
    };

    verifyToken();
  }, [token]);

  if (isValid === null) return <p>Memuat...</p>;
  return isValid ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
