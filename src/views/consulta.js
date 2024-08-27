
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

export default function App(){  
  const [data, setData] = useState([]);

  const getClientes = async () => {
     try {
      const response = await fetch('http://localhost:8000/api/cli');
      const json = await response.json();
      //setData(json.categorias);
      setData(json);
    } catch (error) {
      console.error(error);
    } 
  }

  useEffect(() => {
    getClientes();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>

        <FlatList
          data={data}
          keyExtractor={({idCli}, index) => idCli}
          renderItem={({ item }) => (
            <Text>id{item.idContratante}, nome{item.nomeContratante}</Text>
          )}
        />
      
    </View>
  );
};
