import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Link } from "react-router-dom";

export default function Session() {
  const [email, setEmail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = sessionStorage.getItem("email");
      if (session) {
        setEmail(sessionStorage.getItem("email"));
      }
    }
  }, []);

  const handleSignOut = async (event) => {
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

  return (
    <>
      {email !== null ? (
        <>
          <div>
            <a href="#">{email}</a>
            <button onClick={handleSignOut}>Sign out</button>
            <Link href="/dashboard">Home</Link>
          </div>
        </>
      ) : (
        <div>
          <Link href="./signin">Sign in</Link>
        </div>
      )}
    </>
  );
}
