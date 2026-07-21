const API_URL = import.meta.env.VITE_API_URL || "https://lorreenstorebackend.onrender.com";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message = data?.detail || data?.error || `Request failed: ${response.status}`;
    throw new Error(message);
  }

  return { data, status: response.status };
}

export const productAPI = {
  getAll: () => request("/api/products/"),
  getByCategory: (category) => request(`/api/products/?category=${encodeURIComponent(category)}`),
  getFeatured: () => request("/api/products/?featured=true"),
  getTrending: () => request("/api/products/?trending=true"),
};

export const orderAPI = {
  create: (payload) => request("/api/orders/", { method: "POST", body: JSON.stringify(payload) }),
  getById: (id) => request(`/api/orders/${id}/`),
};

export const cartAPI = {
  addToCart: (productId, quantity = 1) =>
    request("/api/cart/", {
      method: "POST",
      body: JSON.stringify({ product_id: productId, quantity }),
    }),
};

export { API_URL };
