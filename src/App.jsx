import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./hooks/useAuth";

import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const { cookies } = useAuth();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/sign-up" element={!cookies?.token ? <SignUpPage /> : <Navigate to="/" replace />} />
      <Route path="/sign-in" element={!cookies?.token ? <SignInPage /> : <Navigate to="/" replace />} />
    </Routes>
  );
}
