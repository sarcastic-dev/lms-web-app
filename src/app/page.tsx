import React from "react";

import AuthPage from "../components/Signup";
import Loader from "@/components/Loader";
import CreateInstitute from "./pages/create-institute";

export default function Home() {
  return (
    <>
      <AuthPage />
      {/* <Loader/> */}
      {/* <CreateInstitute userId={null}/> */}
    </>
  );
}
