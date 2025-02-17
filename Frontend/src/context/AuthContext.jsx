import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ userId: null, role: null });

  // Load user from cookies when the app starts
  useEffect(() => {
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");
    const role = Cookies.get("role");

    if (token && userId && role) {
      setUser({ userId, role });
    }
  }, []);

  // Login function (Save user data in state & cookies)
  const login = ({ userId, role, token }) => {
    Cookies.set("token", token, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("userId", userId, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("role", role, { expires: 7, secure: true, sameSite: "Strict" });

    setUser({ userId, role });
  };

  // Logout function (Clear cookies & user state)
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    Cookies.remove("role");

    setUser(null);
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
