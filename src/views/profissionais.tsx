import React from 'react';
import { View, Text,  } from 'react-native';

import Pesquisar from './pesquisar';

const Profissionais: React.FC<{ navigation: any, route: any }> = ({ route }) => {

  const { valor1, valor2} = route.params || {}; //rota para trazer os valores

    return (
      <View style={{marginTop:50}}>
      <Text>Valor do primeiro input:{valor1} </Text>
      <Text>Valor do segundo input:{valor2}</Text>
    </View>
    );
};

export default Profissionais;
