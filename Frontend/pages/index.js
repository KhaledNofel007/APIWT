import Header from "./component/header"
import Footer from "./component/footer"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Header title='Homepage' />

      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Game Distribution Website</h1>
        <p className="text-lg text-gray-600">
          Discover and download your favorite games.
        </p>
        <button className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          <Link href={'./registration'}>
            Register
          </Link>
        </button>
        <button className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          <Link href={'./login'}>
            Login
          </Link>
        </button>
      </div>

      <Footer />
    </>
  )
}
