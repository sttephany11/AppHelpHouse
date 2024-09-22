import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background:{
        flex:1,

    },
    container:{
        justifyContent:'center',
        alignItems:'center',
    },
    fundoBranco:{
        backgroundColor:'#fff',
        width:370,
        borderRadius:25,
        marginTop:50,
        marginLeft:22,
        flex:1
    },

    //input que recebe valores
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius:30,
        fontWeight:500,
        fontSize:19,
        backgroundColor:'#faae70',
        borderColor:'#fff',
        color:'red',
        marginTop:10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        height:50,
        width:350,
        marginLeft:10
      },
      searchIcon: {
        marginRight: 10,
      },
      input: {
        flex: 1, 
        borderColor:'black',
        color:'white',
        fontSize:16,
        fontWeight:'bold',
      },

      //container onde vai ficar o perfill dos usuarios
      containerProfissionais:{
        justifyContent:'center',
        alignItems:'center',
        width:310,
        height:150,
        backgroundColor:'#e9e9e7',
        marginLeft:28,
        marginTop:30,
        borderRadius:25,
      },
      margin:{
        marginTop:5,
      },

      imgPerfilPro:{
        width:60,
        height:60,
        borderRadius:50,
       
       
      },
      containerDados:{
        width:300,
        height:80,
        marginLeft:20,
        bottom:20,
        marginTop:30
      },
      NomeProfissional:{
        fontWeight:'bold',
        fontSize:17,
        marginLeft:70,
        bottom:60
      },
      descrPerfil:{
        marginLeft:70,
        bottom:60,
        //fontWeight:'bold',
      },

      //parte das estrelas
      containerAvaliacao:{
        flexDirection:'row',
        bottom:30,
        marginRight:90,
      },
      textOpinioes:{
        marginLeft:5,
        fontSize:10,
        top:4
      },

      //parte da regiao
      containerRegiao:{
        flexDirection:'row',
        bottom:20,
        marginRight:170,
        fontWeight:'bold'
      }
      




});

export default styles;
