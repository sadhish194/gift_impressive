import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid auth_user format. Clearing...");
        localStorage.removeItem("auth_user");
        setUser(null);
        setIsAuthenticated(false);
      }
    }
  }, []);

  const login = (identifier) => {
    const normalizedEmail = identifier.trim().toLowerCase();

    const userObject = {
      id: normalizedEmail,
      email: normalizedEmail,
    };

    localStorage.setItem("auth_user", JSON.stringify(userObject));
    setUser(userObject);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("auth_user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);