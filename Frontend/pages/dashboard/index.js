import Link from "next/link";
import Footer from "../component/footer";
import Header from "../component/header";
import SessionCheck from "../component/sessioncheck";
import UserData from "./userdata";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function() {
  const [email, setEmail] = useState(null);
  const router = useRouter();
  const handleLogout = async (event) => {
    // Logout logic
    event.preventDefault();
    try {
      const response = await axios.get("http://localhost:3000/employee/signout");
      console.log(response.data);
      sessionStorage.removeItem("email");
      setEmail(null);
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return(
    <>
    <SessionCheck />

    <Header title='Employee Dashboard' />

    <div>
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Employee Dashboard</h1>
          <button
            className="text-white px-4 py-2 rounded-md bg-red-500 hover:bg-red-600"
            onClick={handleLogout}
          >
            <Link href={'/'}>Logout</Link>
          </button>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Welcome, Employee!</h2>
        {/* Add your dashboard content here */}
        <UserData />
      </div>
    </div>

    <Footer />
    </>
  )
}