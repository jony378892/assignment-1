import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="relative h-80 mx-auto container w-full bg-cover bg-center mt-3 rounded-lg bg-blue-500">
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="text-3xl sm:text-5xl font-semibold mb-4">
          Welcome to Our Store
        </h1>
        <p className="text-lg mb-8">
          Discover the best products at unbeatable prices
        </p>
        <Link to="/products">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Banner;
