import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#FF8F49',
    
  },
  fundo: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FF8F49',
   
  },
  scrollContainer: {

},
  title: {
    marginTop:'19%',
    justifyContent: 'center',
    alignItems: 'center',    
    
  },

  containerCadastro: {
    width: '100%',
    height:'100%',
    flexDirection:'column' ,
    alignItems: 'center',  
     
  },
  titulo2:{
    color: '#004AAD',
    fontSize: 32,
    fontWeight: '900',
    justifyContent:'center',
    alignItems:'center',
   marginLeft:20,
  },
  
  titulo3:{
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    marginTop:8,
    marginLeft:'8%',
    justifyContent:'center',
    alignItems:'center',
  },
  
  passos:{
        color:'#fff'
  },
  input:{
    width:310,
    height:60,
    position:'relative',
    marginTop:30,
  
   },

   button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
},


  button2:{
    backgroundColor:'#004AAD',
    borderRadius:25,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    marginTop:'30%',
    marginLeft:'22%',
    width:160,  
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.5, 
  },
  buttonText2:{
    color:'#fff',
    fontSize:20,
    fontWeight:'bold'
  },


  //buton buscar cep 
  buttonEnviar: {
  margin:10,
  },


  // inputs
  title3:{
    fontWeight:'700',
    color: 'white',
    marginBottom:10,
    fontSize:20,
    right:2,
    top:9,
    marginTop:10,
    },
  
    input3:{
      borderBottomWidth:3,
      borderColor: '#fff',
      height:40,
      marginBottom:5,
      fontSize:16,
      color:'#fff',
      paddingHorizontal:10,
   
    },

    iconStyle: {
      position: 'absolute',
      right: 15,  // Ícone alinhado à direita
      top: 2,    // Posicionamento vertical
      zIndex: 1,  // Garante que o ícone fique sobre o input
  },
  
  inputContainer: {
      position: 'relative',  // Necessário para permitir o uso do ícone com absolute
      justifyContent: 'center',
  },


      //view de complemento e num
  
  inputNum:{
    borderBottomWidth:3,
    borderColor: '#fff',
    height:40,
    marginBottom:10,
    fontSize:16,
    color:'#fff',
    width:80,
    justifyContent:'flex-start',
    textAlign: 'center',
    },

    

containerIcon:{

},
    //button buscar

    inputsCep:{
      flexDirection:'row',
    },
 

      title4:{
        fontSize:20,
        marginTop:5,
        color:'#fff',
        fontWeight:'bold',
        marginLeft:150,
        },

       
     
});



export default styles;
