import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 140,
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
        top:18,
        textAlign: 'center',
    },
    voce: {
        color: '#004AAD',
    },
    local: {
        marginTop:60,
        width: 340,
        height: 190,
        borderRadius: 90,
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent:'center',

    },
    localFilho: {
        display: 'flex',
        alignItems: 'center',
    },
    text:{
        fontSize:23,
        color:'rgba(0, 0, 0, 0.5);',
        fontWeight: 'bold',
    },
    iconLocaliza: {
        width: 80,
        height: 90,
        position: 'relative',
        top: 90,
        zIndex: 1,
    },
    
    buttonCad:{
       justifyContent:'center',
       alignItems:'center',
        width:230,
        color:'#004AAD',
        marginTop:'30%',
        height:50,
      },

      button2:{
        backgroundColor:'#004AAD',
        borderRadius:30,
        height:'7%',
        width:'45%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'30%',
        shadowColor: 'black',
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 9 },
      shadowOpacity: 0.5,
      },
      buttonText2:{
        color:'#fff',
        fontSize:20,
        fontWeight:'bold'
      },
    
});

export default styles;
