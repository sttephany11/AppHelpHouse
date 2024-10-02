import React from 'react';
import { Radio, RadioGroup, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';


export const RadioGroupSimpleUsageShowcase = (): React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <>

      <Text style={styles.titulo} category='h6'>
        {`Região: ${selectedIndex + 1}`}
      </Text>

      <RadioGroup
        selectedIndex={selectedIndex}
        onChange={index => setSelectedIndex(index)}
      >
        <Radio>
        Zona Norte
        </Radio>

        <Radio>
        Zona Leste
        </Radio>

        <Radio>
        Zona Oeste
        </Radio>

        <Radio>
        Zona Sul
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
    marginTop:10,
  },
});