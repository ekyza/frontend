import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import { Button } from "../components/ui/button";

export default function HomePage() {
  const navigate = useNavigate();
  const { removeCookie } = useAuth();

  const handleOnClick = () => {
    removeCookie("token");

    navigate("/sign-in");
  };

  return (
    <div className="min-h-screen">
      <header className="py-6 px-4">
        <nav className="xl:mx-auto max-w-screen-xl flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Frontend
          </Link>

          <Button type="button" className="text-sm" onClick={handleOnClick}>
            Sign out
          </Button>
        </nav>
      </header>
    </div>
  );
}
