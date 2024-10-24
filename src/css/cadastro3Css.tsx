import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderWidth:3,
    borderColor:"black"
  },


  //foto
  containerPerfil:{
  justifyContent:'center',
  alignItems:'center',
  },
  fundo:{
    height: '100%',
    width: '100%',
    backgroundColor: '#FF8F49',
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
    fontSize: 35,
    fontWeight: '900',
    justifyContent:'center',
    alignItems:'center',
   
  },

  passos:{
    color:'#fff'
},

subtitulo:{
    color:'#fff',
    justifyContent:'center',
    alignItems:'center',
    fontSize:20,
    fontWeight: '700',
    marginTop:10,
},

  photo:{
    width:170,
    height:170,
    borderRadius:100,
    marginTop:50,
    borderColor:'#004AAD',
    borderWidth:5,
    margin:10,
  },

  cameraIcon: {
    position: 'absolute',
    top: 185,
    left: 127,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 5,
    marginRight:100
  },


    // códigos input 
    title3:{
      fontWeight:'700',
      color: 'white',
      marginBottom:10,
      fontSize:24,
      right:2,
      top:9,
     marginTop:10,
    },
  
    input3:{
    borderBottomWidth:3,
    borderColor: '#fff',
    height:40,
    marginBottom:5,
    fontSize:20,
    color:'#fff',
    paddingHorizontal:10,
    },

    input:{
      width:310,
      height:600,
      position:'relative',
      top:30,
     },
  




  //button proximo
   
  button2:{
    backgroundColor:'#004AAD',
    borderRadius:25,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    marginTop:60,
    marginLeft:75,
    width:160, 
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

  button3:{
    backgroundColor:'#004AAD',
    borderRadius:25,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    marginTop:10,
    width:160, 
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.5, 
  }, 

  passwordContainer: {
    position: 'relative',  
    width: '100%',         
},

eyeIcon: {
    position: 'absolute',
    right: 10,             
    top: 5,           
    zIndex: 1,             
},



});

export default styles;