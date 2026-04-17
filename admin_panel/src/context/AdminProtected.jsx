import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminProtected;