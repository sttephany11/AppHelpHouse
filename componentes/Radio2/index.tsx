
import React from 'react';
import { Radio, RadioGroup, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';


export const RadioGroupSimpleUsageShowcase2 = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <>

      <Text style={styles.titulo} category='h6'>
        {`Genêro do profissional: ${selectedIndex + 1}`}
      </Text>

      <RadioGroup
        selectedIndex={selectedIndex}
        onChange={index => setSelectedIndex(index)}
      >
        <Radio>
        Feminino
        </Radio>

        <Radio>
        Masculino
        </Radio>

        <Radio>
        Sem preferência de genêro
        </Radio>

      </RadioGroup>

    </>
  );
};

const styles = StyleSheet.create({
  titulo:{
    fontSize:19,
    color:'#ff914d',
    marginBottom:10,
    marginTop:30,
  },
});