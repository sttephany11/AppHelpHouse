import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    //fundo
    background: {
        flex: 1,

    },
    fundoBranco:{
        backgroundColor:'#fff',
        width:350,
        borderRadius:25,
        marginTop:'30%',
        marginLeft:33,
        flex:1
    },
    
    container:{
    justifyContent:'center',
    alignItems:'center',
   
    },

    imgPerfil: {
        borderRadius: 100,
        width: 150,
        height: 150,
        justifyContent: 'center',
        bottom: 65,
        borderColor: '#004aad',
        borderWidth: 5,

    },
//nome do usuario
    nome:{
        fontSize:28,
        fontWeight:'bold',
        color:'#004aad',
        bottom: 65,
        marginTop:15,
    },
    textLocalizacao:{
        bottom: 65,
    },
    textEmail:{
      bottom: 65,
  },

    // mais procurados
    maisProcurados:{
        marginTop:40,
        fontSize:15,
        fontWeight:'bold',
        color:'#004aad',
        bottom: 65,
    },

    // container: {
    //   flex: 1,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    button: {
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: '#FFF',
      fontSize: 16,
    },
    image: {
      width: 200,
      height: 200,
      marginTop: 20,
    },
    imageContainer: {
      marginTop: 20,
      alignItems: 'center',
    },

    cameraIcon: {
      position: 'absolute',
      top: 50,
      right: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: 20,
      padding: 5,
      marginRight:100
    },
   });
export default styles;

