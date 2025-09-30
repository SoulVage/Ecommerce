export async function loadProducts() {
    try {
      const response = await fetch("/data/products.json");
      return await response.json();
    }
     catch (err) {
      console.error("Error loading products:", err);
      return [];
    }
  }
  