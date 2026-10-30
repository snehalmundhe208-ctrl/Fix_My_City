const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const apiClient = {
  async get(endpoint) {
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`API GET ${endpoint} failed, using local state:`, err.message);
      throw err;
    }
  },

  async post(endpoint, body) {
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`API POST ${endpoint} failed:`, err.message);
      throw err;
    }
  },

  async put(endpoint, body) {
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`API PUT ${endpoint} failed:`, err.message);
      throw err;
    }
  }
};
