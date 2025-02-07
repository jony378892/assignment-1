import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchProductBySlug } from "../api/products";
import { CartContext } from "./Home";

function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItemToCart } = useContext(CartContext);

  useEffect(() => {
    async function getProduct() {
      try {
        const data = await fetchProductBySlug(slug);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, [slug]);

  if (loading) {
    return <p className="text-3xl text-center">Loading...</p>;
  }

  if (!product) {
    return <p className="text-3xl text-center">Product not found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row gap-8">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full sm:w-2/3 lg:1/3  h-auto object-cover rounded-lg"
        />
        <div className="flex flex-col gap-4 mt-14">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="">{product.description}</p>
          <p className="text-xl font-semibold text-blue-600">
            ${product.price}
          </p>
          <button
            className="bg-blue-500 rounded-md text-white px-4 py-2 mt-3 cursor-pointer w-fit"
            onClick={addItemToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
