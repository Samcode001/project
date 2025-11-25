import { createContext, useState, useContext, type ReactNode } from "react";
import axios from "axios";

const API = import.meta.env.VITE_AUTH_API_URL;
// const API = "http://localhost:3000/v1";

type AuthContextType = {
  accessToken: string | null;
  signUp: (name: string, username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const signUp = async (name: string, username: string, password: string) => {
    const res = await axios.post(
      `${API}/signup`,
      { name, username, password },
      { withCredentials: true }
    );
    setAccessToken(res.data.accessToken);
  };

  const login = async (username: string, password: string) => {
    // call login endpoint; server sets refresh cookie
    const res = await axios.post(
      `${API}/signin`,
      { username, password },
      { withCredentials: true }
    );
    setAccessToken(res.data.accessToken);
  };

  const logout = async () => {
    await axios.post(`${API}/logout`, {}, { withCredentials: true });
    setAccessToken(null);
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    try {
      const res = await axios.post(
        `${API}/refresh`,
        {},
        { withCredentials: true }
      );
      const newToken = res.data.accessToken;
      setAccessToken(newToken);
      return newToken;
    } catch (err) {
      setAccessToken(null);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, signUp, login, logout, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
