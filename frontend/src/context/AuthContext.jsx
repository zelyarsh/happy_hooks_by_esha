import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/auth`;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [loading, setLoading] = useState(true);

  // Get currently logged-in user
  useEffect(() => {
    const getCurrentUser = async () => {
      const savedToken = localStorage.getItem("token");

      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setUser(data.user);
          setToken(savedToken);
        } else {
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  // Register
  const register = async (name, email, password) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        return {
          success: false,
          message: data.message || "Registration failed.",
        };
      }

      localStorage.setItem("token", data.token);

      setToken(data.token);
      setUser(data.user);

      return {
        success: true,
        user: data.user,
      };
    } catch {
      return {
        success: false,
        message: "Unable to connect to the server.",
      };
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        return {
          success: false,
          message: data.message || "Login failed.",
        };
      }

      localStorage.setItem("token", data.token);

      setToken(data.token);
      setUser(data.user);

      return {
        success: true,
        user: data.user,
      };
    } catch {
      return {
        success: false,
        message: "Unable to connect to the server.",
      };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
