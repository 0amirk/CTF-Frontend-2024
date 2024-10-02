"use client";
import React, { useState } from "react";
import Preloader from "./loader";
const CTFForm = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    ThmId: "",
    Token: "",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://ctf-backend-rfec.onrender.com/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userData: formData }),
        }
      ); 

      const result = await response.json();
      setMessage(result.message);

      if (!response.ok) {
        throw new Error(result.error || "Error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  const handleLoaded = () => {
    setIsLoading(false);
  };

  return (
    <div className="bg-[#1d0a0a] text-[#f4dede] min-h-screen flex flex-col items-center justify-center p-4 font-caesar">
      <h1 className="mb-6 text-4xl font-bold md:text-6xl">Submit Your Flag</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#CD321D4C] p-6 rounded-lg shadow-lg text-lg md:text-xl"
      >
        <label className="block mb-4">
          Name:
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-[#f4dede] text-[#1d0a0a] rounded-md shadow-sm"
          />
        </label>

        <label className="block mb-4">
          Email:
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-[#f4dede] text-[#1d0a0a] rounded-md shadow-sm"
          />
        </label>

        <label className="block mb-4">
          Phone:
          <input
            type="text"
            name="Phone"
            value={formData.Phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-[#f4dede] text-[#1d0a0a] rounded-md shadow-sm"
          />
        </label>

        <label className="block mb-4">
          TryHackMe ID:
          <input
            type="text"
            name="ThmId"
            value={formData.ThmId}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-[#f4dede] text-[#1d0a0a] rounded-md shadow-sm"
          />
        </label>

        <label className="block mb-4">
          CTF Flag:
          <input
            type="text"
            name="Token"
            value={formData.Token}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-[#f4dede] text-[#1d0a0a] rounded-md shadow-sm"
          />
        </label>

        <button
          type="submit"
          className="w-full py-2 bg-[#ce321d] text-[#f4dede] rounded-md hover:bg-[#c34c3f] transition"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              Submitting...
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </form>

      {message && <p className={`mt-4 text-[#f4dede] text-xl`}>{message}</p>}
    </div>
  );
};
export default CTFForm;
