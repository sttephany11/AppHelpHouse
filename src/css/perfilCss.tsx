import { StyleSheet, ImageStyle } from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    voce: {
      color: 'orange',
    },
    button2: {
      padding: 10,
      backgroundColor: 'orange',
      borderRadius: 5,
      margin: 10,
    },
    buttonText2: {
      color: 'white',
      fontSize: 16,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50,
    } as ImageStyle,
  });
  

export default styles;
