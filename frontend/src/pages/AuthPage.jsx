import { Link } from "react-router-dom";

function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-6">Welcome to Notes App</h1>

        <Link
          to="/login"
          className="block bg-blue-400 text-white py-2 rounded mb-3 hover:bg-blue-700"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="block bg-green-500 text-white py-2 rounded mb-3 hover:bg-green-700"
        >
          Register
        </Link>

        <button
          className="w-full border py-2 rounded hover:bg-gray-100"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
