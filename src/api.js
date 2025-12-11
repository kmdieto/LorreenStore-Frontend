// Backend API URL (Netlify env variable OR Render backend)
let API_URL = import.meta.env.VITE_API_URL || "https://lorreenstorebackend.onrender.com";

// Remove trailing slash (to avoid "//api")
API_URL = API_URL.replace(/\/+$/, "");

export async function fetchProducts() {
  try {
    const response = await fetch(`${API_URL}/api/products/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Backend returned:", response.status, response.statusText);
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export { API_URL };
