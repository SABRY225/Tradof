import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { refreshToken as rToken } from "@/Util/Https/http";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ userId: null, role: null, token: null });

  const refreshToken = async () => {
    try {
      const oldRefreshToken = Cookies.get("refreshToken");
      if (!oldRefreshToken) {
        console.warn("No refresh token found, logging out...");
        logout();
        return null;
      }

      const data = await rToken({ oldToken: oldRefreshToken });
      const { accessToken, refreshToken: newRefreshToken } = data;

      if (accessToken && newRefreshToken) {
        Cookies.set("token", accessToken, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("refreshToken", newRefreshToken, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });

        setUser((prevUser) => ({ ...prevUser, token: accessToken }));
        return { accessToken, newRefreshToken };
      }
    } catch (error) {
      console.error("Failed to refresh token", error);
      logout();
    }
    return null;
  };

  const checkToken = async () => {
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");
    const role = Cookies.get("role");
    let refreshToken = Cookies.get("refreshToken");

    if (!token || !userId || !role) {
      console.warn("Missing authentication data, logging out...");
      logout();
      return;
    }

    try {
      // Decode token (Assuming JWT)
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const isExpired = tokenPayload.exp * 1000 < Date.now();

      if (isExpired) {
        console.log("Token expired, attempting refresh...");
        const newToken = await refreshToken();
        if (!newToken) throw new Error("Failed to refresh token");
        refreshToken = newToken.newRefreshToken;
      }
      login({
        userId,
        role,
        token,
        refreshToken,
      });
    } catch (error) {
      console.error("Error decoding token, logging out...");
      logout();
    }
  };

  useEffect(() => {
    checkToken();

    const interval = setInterval(async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const tokenPayload = JSON.parse(atob(token.split(".")[1]));
          const timeLeft = tokenPayload.exp * 1000 - Date.now();

          if (timeLeft < 60000) {
            console.log("Token about to expire, refreshing...");
            await refreshToken();
          }
        } catch (error) {
          console.error("Error decoding token in interval, logging out...");
          logout();
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const login = ({ userId, role, token, refreshToken }) => {
    Cookies.set("token", token, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("refreshToken", refreshToken, {
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

    setUser({ userId, role, token });

    console.warn("User logged in");
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    Cookies.remove("userId");
    Cookies.remove("role");

    setUser(null);
    console.warn("User logged out.");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
