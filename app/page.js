"use client";
import React, { useState, useEffect } from "react";
import CTFForm from "./ctfHome";
import Preloader from "./loader";
const Page = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 7000); // Adjust time to control how long the preloader is displayed

    return () => clearTimeout(timer);
  }, []);

  return <>{isLoading ? <Preloader /> : <CTFForm />}</>;
};

export default Page;
