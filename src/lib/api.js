const API_URL = import.meta.env.VITE_API_URL;

async function fetchApi(endpoint, options = {}) {
  const { body, ...rest } = options;
  const config = {
    headers: { 'Content-Type': 'application/json', ...rest.headers },
    ...rest,
  };
  if (body && typeof body === 'object' && !(body instanceof FormData)) {
    config.body = JSON.stringify(body);
  } else if (body) {
    config.body = body;
  }

  const res = await fetch(`${API_URL}${endpoint}`, config);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// ═══════════════════════════
// Product API
// ═══════════════════════════
export const productApi = {
  getAll: () => fetchApi('/products'),
  getById: (id) => fetchApi(`/products/${id}`),
  create: (data) => fetchApi('/products', { method: 'POST', body: data }),
  update: (id, data) => fetchApi(`/products/${id}`, { method: 'PUT', body: data }),
  delete: (id) => fetchApi(`/products/${id}`, { method: 'DELETE' }),
};

// ═══════════════════════════
// User API
// ═══════════════════════════
export const userApi = {
  getAll: () => fetchApi('/users'),
  getById: (id) => fetchApi(`/users/${id}`),
  create: (data) => fetchApi('/users', { method: 'POST', body: data }),
  update: (id, data) => fetchApi(`/users/${id}`, { method: 'PUT', body: data }),
  delete: (id) => fetchApi(`/users/${id}`, { method: 'DELETE' }),
};
