import { useEffect, useState, useContext } from "react";
import { fetchProducts } from "../api/products";
import { Link } from "react-router-dom";
import { CartContext } from "./Home"; // Import CartContext

function ProductsPage() {
  const { addItemToCart } = useContext(CartContext); // Use CartContext
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  useEffect(() => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  if (loading) {
    return <p className="text-3xl text-center">Loading...</p>;
  }

  if (filteredProducts.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="container mx-auto pb-10">
      <h3 className="text-2xl text-center uppercase py-5 font-semibold ">
        Our collection
      </h3>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-400 p-2 rounded"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 ">
        {filteredProducts.map((product) => (
          <div
            key={product.slug}
            className="border border-gray-400 p-4 rounded flex flex-col gap-3">
            <Link to={`/products/${product.slug}`}>
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-auto object-cover bg-center mb-4"
              />
            </Link>
            <div className="flex flex-col gap-1">
              <Link
                to={`/products/${product.slug}`}
                className="space-y-1">
                <h2 className="text-lg font-semibold text-stone-700">
                  {product.name}
                </h2>
                <p className="text-sm">{product.description}</p>
              </Link>

              <p className="text-lg font-semibold text-stone-700">
                ${product.price}
              </p>
              <Link to={`/products/${product.slug}`}>
                <button
                  className="bg-blue-500 rounded-md text-white px-4 py-2 mt-3 cursor-pointer w-fit"
                  onClick={() => addItemToCart(product)} // Add product parameter
                >
                  Add to Cart
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
