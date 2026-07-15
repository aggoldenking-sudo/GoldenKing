/**
 * Golden King API Client
 * Frontend client to interact with the backend API
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

class GoldenKingClient {
  constructor() {
    this.token = typeof localStorage !== 'undefined' ? localStorage.getItem('auth_token') : null;
    this.user = typeof localStorage !== 'undefined' && localStorage.getItem('auth_user') 
      ? JSON.parse(localStorage.getItem('auth_user')) 
      : null;
  }

  /**
   * Set authentication token
   */
  setToken(token, user) {
    this.token = token;
    this.user = user;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
    }
  }

  /**
   * Clear authentication
   */
  clearAuth() {
    this.token = null;
    this.user = null;
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
  }

  /**
   * Get authorization headers
   */
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  /**
   * Make API request
   */
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers
      }
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error en la solicitud');
    }

    return data;
  }

  /**
   * User registration
   */
  async register(username, email, password) {
    const response = await this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password })
    });

    this.setToken(response.token, response.usuario);
    return response;
  }

  /**
   * User login
   */
  async login(email, password) {
    const response = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    this.setToken(response.token, response.usuario);
    return response;
  }

  /**
   * User logout
   */
  logout() {
    this.clearAuth();
  }

  /**
   * Create ticket with plays
   */
  async createTicket(jugadas) {
    const response = await this.request('/api/jugadas/crear', {
      method: 'POST',
      body: JSON.stringify({ jugadas })
    });

    return response;
  }

  /**
   * Get sales reports
   */
  async getSalesReport(fechaInicio = null, fechaFin = null) {
    let endpoint = '/api/reportes/ventas';
    const params = new URLSearchParams();
    
    if (fechaInicio) params.append('fechaInicio', fechaInicio);
    if (fechaFin) params.append('fechaFin', fechaFin);
    
    if (params.toString()) {
      endpoint += `?${params.toString()}`;
    }

    const response = await this.request(endpoint, { method: 'GET' });
    return response;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!this.token && !!this.user;
  }

  /**
   * Get current user
   */
  getCurrentUser() {
    return this.user;
  }
}

// Export singleton instance
if (typeof window !== 'undefined') {
  window.GoldenKingClient = new GoldenKingClient();
}

module.exports = GoldenKingClient;
