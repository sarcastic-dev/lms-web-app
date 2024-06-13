"use client"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../loader/Loader.module.css"

const LoadingPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard"); // Redirect to the desired page after the delay
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className={styles.loader}></div> {/* Loading spinner */}
    </div>
  );
};

export default LoadingPage;
