"use client"
import React, { useState } from "react";
import WelcomeHome from "../components/Welcome/WelcomeHome"; // Import the Welcome component
import Home from "../components/Home"; // Import the Home component

const App: React.FC = () => {
  const [showHome, setShowHome] = useState(false);

  const handleNavigation = () => {
    setShowHome(true); // Switch to Home component
  };

  return (
    <div>
      {/* Conditional rendering based on state */}
      {showHome ? <Home /> : <WelcomeHome onNavigateToHome={handleNavigation} />}
    </div>
  );
};

export default App;
