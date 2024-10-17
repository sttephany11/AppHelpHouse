import React, { createContext, useState, useContext, useEffect } from 'react';
import { MMKV } from 'react-native-mmkv';

// Crie uma instância do MMKV
const storage = new MMKV();

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => storage.getString('userId') || null);
  const [userData, setUserData] = useState(() => {
    const data = storage.getString('userData');
    return data ? JSON.parse(data) : null;
  });

  const handleSetUserId = (id) => {
    setUserId(id);
    storage.set('userId', id); // Salva no MMKV
  };

  const handleSetUserData = (data) => {
    setUserData(data);
    storage.set('userData', JSON.stringify(data)); // Salva no MMKV
  };

  return (
    <UserContext.Provider value={{ userId, setUserId: handleSetUserId, userData, setUserData: handleSetUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useUser = () => {
  return useContext(UserContext);
};
