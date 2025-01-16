import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { cookies } = useAuth();

  if (!cookies?.token) return <Navigate to="/sign-in" replace />;

  return children;
}
