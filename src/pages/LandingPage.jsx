import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/sign-up");
  };

  return (
    <div className="min-h-screen">
      <header className="py-4 px-6">
        <nav className="xl:mx-auto max-w-screen-xl flex justify-between items-center">
          <Link to="/landing" className="text-xl font-bold">
            Frontend
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/sign-in" className="text-sm">
              Sign In
            </Link>

            <Button className="text-sm" onClick={handleOnClick}>
              Sign Up
            </Button>
          </div>
        </nav>
      </header>
    </div>
  );
}
