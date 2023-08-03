import React, { useState } from 'react';
import Header from './component/header';
import axios from 'axios';
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    // Perform form validation
    const isFormValid = validateForm();

    if (isFormValid) {
      // Form is valid, proceed with login logic
      // Add your login logic here
    } else {
      // Form is not valid, display error messages or handle invalid form submission
      console.log('Form is not valid');
    }
  };

  const validateForm = () => {
    // Perform validation for each input field
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isPasswordValid = password.length >= 7;

    return isEmailValid && isPasswordValid;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Login Logic
    try {
      const response = await axios.post("http://localhost:3000/employee/signin", {
        email,
        password,
      });
      console.log("res: " + response.data);
      sessionStorage.setItem("email", response.data);
      router.push("/dashboard");
    } catch (error) {
      console.log("error22: " + error.message);
      setError("Invalid Login");
    }
  };

  return(
    <>
    <Header title='Employee Login' />
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/4 p-8 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Login
          </button>

          {error && (
            <div>
              <p
                id="outlined_error_help"
                class="mt-2 relative left-1.5 text-xs text-red-600 dark:text-red-400"
              >
                <span class="font-medium">{error}</span>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
    </>
  )

}