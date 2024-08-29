"use client";
import withAuthCheck from "@/components/withAuthCheck";
import React from "react";

const Page: React.FC = () => {
  return <div>Dashboard</div>;
};

export default withAuthCheck(Page);
