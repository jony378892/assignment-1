import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-8">Page Not Found</p>
      <Link
        to="/"
        className="text-blue-500 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
}

export default ErrorPage;
