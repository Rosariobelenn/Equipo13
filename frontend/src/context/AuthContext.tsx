import { createContext, useContext, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loginTime: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loginTime: null,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("userData") || "null")
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loginTime, setLoginTime] = useState<string | null>(
    localStorage.getItem("loginTime")
  );
  const login = async (email: string, password: string) => {
    const response = await fetch("https://pymego.onrender.com/v1/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gmail: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al iniciar sesión");
    }

    // 🔹 El backend devuelve el token en 'access_token'
    const token = data.access_token;
    const user = data.user;

    setToken(token);
    setUser(user);

    // Guardar en localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userData", JSON.stringify(user));
    const now = new Date().toISOString();
    setLoginTime(now);
    localStorage.setItem("loginTime", now);

    console.log("✅ Usuario autenticado:", {
      token,
      user,
      expires_in: data.expires_in,
      token_type: data.token_type,
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("loginTime");
    setLoginTime(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loginTime, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
