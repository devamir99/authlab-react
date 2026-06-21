/**
 * @deprecated Legacy mock API (json-server). Will be replaced with client-side
 * mock flows in Phase 3+. No backend is required for this project.
 */
import axios from "axios";

// Base URL for our mock API
const API_BASE_URL = "http://localhost:3001";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post("/users", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      // For mock API, we'll simulate a successful registration
      return {
        success: true,
        message: "Registration completed successfully",
        user: {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
        },
      };
    } catch (error) {
      if (error.response?.status === 400) {
        return {
          success: false,
          message: "Email already exists",
        };
      }
      return {
        success: false,
        message: "Registration error. Please try again",
      };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      // Get all users to find matching credentials
      const response = await api.get("/users");
      const users = response.data;

      const user = users.find(
        (u) =>
          u.email === credentials.email && u.password === credentials.password
      );

      if (user) {
        // Generate a simple token (in real app, this would come from server)
        const token = `mock_token_${user.id}_${Date.now()}`;

        return {
          success: true,
          message: "Login successful",
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
          token,
        };
      } else {
        return {
          success: false,
          message: "Invalid email or password",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Login error. Please try again",
      };
    }
  },

  // Get current user profile
  getProfile: async () => {
    try {
      const response = await api.get("/users");
      const token = localStorage.getItem("authToken");

      if (token) {
        // Extract user ID from token (mock implementation)
        const userId = token.split("_")[2];
        const user = response.data.find((u) => u.id == userId);

        if (user) {
          return {
            success: true,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          };
        }
      }

      return {
        success: false,
        message: "User not found",
      };
    } catch (error) {
      return {
        success: false,
        message: "Error fetching user information",
      };
    }
  },

  // Logout (client-side only for mock)
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    return {
      success: true,
      message: "Logout successful",
    };
  },
};
