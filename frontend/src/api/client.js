const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
const IS_OFFLINE_MODE = import.meta.env.VITE_OFFLINE_MODE === 'true';

// Global listeners for backend connectivity status
const statusListeners = new Set();
let isBackendOnline = true;
let lastCheckError = null;

export const subscribeBackendStatus = (callback) => {
  statusListeners.add(callback);
  callback({ isOnline: isBackendOnline, error: lastCheckError });
  return () => statusListeners.delete(callback);
};

const notifyStatus = (online, error = null) => {
  isBackendOnline = online;
  lastCheckError = error;
  statusListeners.forEach(cb => cb({ isOnline, error }));
};

const getHeaders = (isFormData = false) => {
  const token = localStorage.getItem('fixmycity_token');
  const headers = {};
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const apiClient = {
  getIsBackendOnline() {
    return isBackendOnline;
  },

  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        notifyStatus(true);
        return true;
      }
      throw new Error(`Health check returned status ${res.status}`);
    } catch (err) {
      notifyStatus(false, err.message || "Failed to connect to backend server");
      return false;
    }
  },

  async get(endpoint) {
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: getHeaders(false)
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ detail: res.statusText }));
        const err = new Error(errorData.detail || `HTTP ${res.status}`);
        err.status = res.status;
        throw err;
      }
      notifyStatus(true);
      return await res.json();
    } catch (err) {
      if (err.status) {
        // HTTP response from server (e.g. 403, 401, 404)
        notifyStatus(true);
        throw err;
      }
      // Network failure / server offline
      notifyStatus(false, err.message);
      if (!IS_OFFLINE_MODE) {
        throw new Error(`Backend offline: Unable to reach ${API_BASE_URL}. Start server or set VITE_OFFLINE_MODE=true.`);
      }
      throw err;
    }
  },

  async post(endpoint, body, isFormData = false) {
    try {
      const options = {
        method: 'POST',
        headers: getHeaders(isFormData)
      };
      if (isFormData) {
        options.body = body; // Native FormData
      } else {
        options.body = JSON.stringify(body);
      }

      const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ detail: res.statusText }));
        const err = new Error(errorData.detail || `HTTP ${res.status}`);
        err.status = res.status;
        throw err;
      }
      notifyStatus(true);
      return await res.json();
    } catch (err) {
      if (err.status) {
        notifyStatus(true);
        throw err;
      }
      notifyStatus(false, err.message);
      if (!IS_OFFLINE_MODE) {
        throw new Error(`Backend offline: Unable to reach ${API_BASE_URL}. Start server or set VITE_OFFLINE_MODE=true.`);
      }
      throw err;
    }
  },

  async put(endpoint, body) {
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: getHeaders(false),
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ detail: res.statusText }));
        const err = new Error(errorData.detail || `HTTP ${res.status}`);
        err.status = res.status;
        throw err;
      }
      notifyStatus(true);
      return await res.json();
    } catch (err) {
      if (err.status) {
        notifyStatus(true);
        throw err;
      }
      notifyStatus(false, err.message);
      if (!IS_OFFLINE_MODE) {
        throw new Error(`Backend offline: Unable to reach ${API_BASE_URL}. Start server or set VITE_OFFLINE_MODE=true.`);
      }
      throw err;
    }
  }
};
