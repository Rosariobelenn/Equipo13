// src/context/ApiContext.tsx
import { createContext, useContext } from "react";
import { AuthService } from "../services/auth.service";
import { CreditService } from "../services/credit.service";

interface ApiContextProps {
  auth: typeof AuthService;
  credit: typeof CreditService;
}

const ApiContext = createContext<ApiContextProps | undefined>(undefined);

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApiContext.Provider value={{ auth: AuthService, credit: CreditService }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) throw new Error("useApi debe usarse dentro de ApiProvider");
  return context;
};
