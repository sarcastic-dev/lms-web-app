"use client";
import React from "react";
import WelcomeHome from "../components/Welcome/WelcomeHome";
import Navbar from "@/components/Welcome/Navbar";

const App: React.FC = () => {
	return (
		<div className='flex flex-col'>
			<Navbar />
      <WelcomeHome />
      
		</div>
	);
};

export default App;
