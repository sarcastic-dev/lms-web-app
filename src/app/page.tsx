import React from "react";

import AuthPage from "../components/Signup";
import Loader from "@/components/Loader";
import CreateInstitute from "./pages/create-institute";
// import CreateProfile from "@/components/CreateProfile";

export default function Home() {
  return (
    <>
      <AuthPage />
      {/* <CreateProfile input={""}/> */}
      {/* <Loader/> */}
      {/* <CreateInstitute userId={null}/> */}
    </>
  );
}
