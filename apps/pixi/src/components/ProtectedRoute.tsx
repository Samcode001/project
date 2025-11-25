import React from "react";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import type { JSX } from "@emotion/react/jsx-runtime";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { accessToken } = useAuth();
  if (!accessToken) return <Navigate to="/login" replace />;
  return children;
};
