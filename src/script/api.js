export async function loadProducts() {
    try {
      const response = await fetch("http://localhost:3000/data/products.json");
      return await response.json();
    }
     catch (err) {
      console.error("Error loading products:", err);
      return [];
    }
  }
  