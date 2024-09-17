"use client";
import React, { useEffect, useState } from "react";
import "./globals.css"; // Make sure to create this CSS file for styling

const Preloader = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      setCount((prevCount) => {
        const randomIncrement = Math.floor(Math.random() * 3) + 1;
        const newCount = Math.min(prevCount + randomIncrement, 100);
        if (newCount >= 100) {
          clearInterval(interval);
        }
        return newCount;
      });
    };

    const interval = setInterval(updateCount, 120); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full p-4 preloader font-caesar">
      <div className="flex flex-col items-center justify-end h-1/2">
        <h1 className="text-4xl preloader-text md:text-7xl">
          Welcome, Hacker.
        </h1>
      </div>
      <div className="flex items-end justify-end text-4xl md:text-6xl h-1/2">
        {count}
      </div>
    </div>
  );
};

export default Preloader;
