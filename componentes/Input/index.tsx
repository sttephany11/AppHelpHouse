import React from 'react';
import { StyleSheet } from 'react-native';
import { Input, InputProps } from '@ui-kitten/components';

const useInputState = (initialValue = ''): InputProps => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

export const InputSizeShowcase = (): React.ReactElement => {


  const multilineInputState = useInputState();

  return (
    <>


      <Input
        multiline={true}
        textStyle={styles.inputTextStyle}
        placeholder='Solicitação'
        {...multilineInputState}
      />

    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 2,
  },
  inputTextStyle: {
    minHeight: 64,
  },
});
