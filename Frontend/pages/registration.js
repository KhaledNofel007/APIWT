import { useState } from 'react';
import Header from './component/header';
import axios from 'axios';

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleInsertUser = async () => {
    // Perform logic to insert the user using the userData state
    response = await axios.post(
      "http://localhost:3000/employee/createEmployee",
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }
    ); 
    console.log("Employee added successfully");
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateForm()

    if(isFormValid) {
      handleInsertUser();
      console.log(response.data);
    } else {
      console.log('Form Is Not Valid')
    }
  }

  const validateForm = () => {
    // Perform validation for each input field
    const isNameValid = formData.name.trim() !== '';
    const isEmailValid = /\S+@\S+\.\S+/.test(formData.email);
    const isPasswordValid = formData.password.length >= 6;

    return isNameValid && isEmailValid && isPasswordValid;
  };

  return(
    <>
    <Header title='Employee Registration' />
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/4 p-8 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name='name'
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name='email'
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              value={formData.email}
              onChange={handleInputChange}
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
              name='password'
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
    </>
  )
}
