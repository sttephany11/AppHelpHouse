import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);

  // Função para carregar dados do AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      const storedUserData = await AsyncStorage.getItem('userData');

      setUserId(storedUserId);
      setUserData(storedUserData ? JSON.parse(storedUserData) : null);
    };

    loadData();
  }, []);

  const handleSetUserId = async (id) => {
    setUserId(id);
    await AsyncStorage.setItem('userId', id); // Salva no AsyncStorage
  };

  const handleSetUserData = async (data) => {
    setUserData(data);
    await AsyncStorage.setItem('userData', JSON.stringify(data)); // Salva no AsyncStorage
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