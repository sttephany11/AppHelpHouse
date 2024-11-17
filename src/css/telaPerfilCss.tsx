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
        marginTop:180,
        marginLeft:23,
        height:550
    },
    
    container:{
    justifyContent:'center',
    alignItems:'center',
   
    },
    container2:{
      justifyContent:'center',
      alignItems:'center',
      bottom:45
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
        fontSize:30,
        fontWeight:'bold',
        color:'#004aad',
        bottom: 65,
        marginTop:15,
    },
    textLocalizacao:{
        bottom: 60,
    },
    textEmail:{
      bottom: 65,
  },

    // mais procurados
    maisProcurados:{
        marginTop:40,
        fontSize:20,
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
    //MAIS PROCURADOS 
    containerProfissoes:{
      flexDirection:'row',
      marginLeft:19,
      marginTop:30,
      bottom:80
    },
    buttonProfissoes:{
      backgroundColor:'#ede6e6',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius:25,
      
    },

    buttonProfissoes2:{
      backgroundColor:'#ede6e6',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius:25,
      marginLeft:10
    },

    textButton:{
      justifyContent:'center',
      alignItems:'center',
      color:'#5169a2',
      fontSize:17
    },
    butaoAzul:{
      width:300,
      height:50,
      backgroundColor:'#004aad',
      borderRadius:20,
     

    },
    textButton2:{
      justifyContent:'center',
      alignItems:'center',
      color:'#fff',
      fontSize:20,
      fontWeight:'bold',
      marginLeft:105,
      bottom:34
    },
    textButton3:{
      justifyContent:'center',
      alignItems:'center',
      color:'#fff',
      fontSize:20,
      fontWeight:'bold',
      marginLeft:85,
      bottom:34
    },
    icon:{
      marginLeft:30,
      paddingVertical:8,
    },
   });
export default styles;

