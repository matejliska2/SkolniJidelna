import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import API_ENDPOINTS from "./apiConfig";

const ProtectedRoute = () => {
    const [isValid, setIsValid] = useState(null);
    const token = sessionStorage.getItem("token");
  
    useEffect(() => {
      const verifyToken = async () => {
        if (!token) {
          setIsValid(false);
          return;
        }
  
        try {
          const response = await fetch(API_ENDPOINTS.verifyToken, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
            },
          });
  
          const data = await response.json();
          setIsValid(data.valid);
        } catch (error) {
          setIsValid(false);
        }
      };
  
      verifyToken();
    }, [token]);
  
    if (isValid === null) return <p>Načítání...</p>;
    return isValid ? <Outlet /> : <Navigate to="/login" />;
  };

export default ProtectedRoute;