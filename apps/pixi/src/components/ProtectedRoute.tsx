import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import type { JSX } from "@emotion/react/jsx-runtime";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { accessToken, loading } = useAuth();

  if (loading) return null;

  if (!accessToken) return <Navigate to="/signin" replace />;

  return children;
};
