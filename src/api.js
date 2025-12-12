const API_URL = import.meta.env.VITE_API_URL || "https://lorreenstorebackend.onrender.com";

export async function fetchProducts() {
  try {
    const response = await fetch(`${API_URL}/api/products/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Backend error:", response.status, response.statusText);
      throw new Error("Failed to fetch products");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export { API_URL };
