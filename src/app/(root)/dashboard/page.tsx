"use client";
import withAuthCheck from "@/components/withAuthCheck";
import React from "react";

const page = () => {
	return <div>Dashboard</div>;
};

export default withAuthCheck(page);
