import React, { createContext, useState, useContext, ReactNode  } from 'react';

interface Alert {
  id: number; // Identificação única para cada alerta
  message: string;
}

interface ContextProps {
  user: { idContratante: string; nomeContratante: string };
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  clearAlert: (id: number) => void;
}
interface AuthProviderProps {
    children: ReactNode;
  }

const myContext = createContext<ContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = (alert: Alert) => setAlerts((prev) => [...prev, alert]);
  const clearAlert = (id: number) =>
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));

  return (
    <myContext.Provider
      value={{
        user: { idContratante: '123', nomeContratante: 'João' }, // Exemplo
        alerts,
        addAlert,
        clearAlert,
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(myContext);
  if (!context) throw new Error('useAuthContext must be used within AuthProvider');
  return context;
};
