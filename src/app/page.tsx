"use client"
import React, { useState } from "react";
import WelcomeHome from "../components/Welcome/WelcomeHome"; // Import the Welcome component

const App: React.FC = () => {
  const [showHome, setShowHome] = useState(false);

  const handleNavigation = () => {
    setShowHome(true); // Switch to Home component
  };

  return (
    <div>
      {/* Conditional rendering based on state */}
      <WelcomeHome />
    </div>
  );
};

export default App;
