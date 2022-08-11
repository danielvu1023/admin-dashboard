import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext/AuthContext";

export const UnprotectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (user) {
    // user is authenticated
    console.log(user);
    return <Navigate to="/" />;
  }
  return children;
};
