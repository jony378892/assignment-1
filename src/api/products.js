import sampleData from "../data/sample-data";

export function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleData.products);
    }, 500); // Simulate a delay
  });
}

export function fetchProductBySlug(slug) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = sampleData.products.find((p) => p.slug === slug);
      if (product) {
        resolve(product);
      } else {
        reject(new Error("Product not found"));
      }
    }, 500); // Simulate a delay
  });
}
