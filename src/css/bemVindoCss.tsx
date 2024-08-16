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
        fontSize: 33,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
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
        fontSize:21,
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
        borderRadius:25,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        marginTop:'30%',
        width:230,  
      },
      buttonText2:{
        color:'#fff',
        fontSize:20,
        fontWeight:'bold'
      },
    
});

export default styles;
