import { ScrollView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',    
      overflow:'hidden', 
  },
 
  fundo: {
    height: '120%',
    width: '140%',
    backgroundColor: '#FF8F49',
    position: 'absolute', 
    top: '17%',            
    left: '-20%',         
    borderRadius: 250,
    zIndex: -1,
    overflow:'hidden',
    flex:1,
  },
  scrollContainer: {

},
  title: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',    
    height:'10%'
  },

  titleCadastro: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',    
    height:'14%'
  },
  titulo: {
    color: '#FF8F49',
    fontSize: 30,
    fontWeight: '900',
 
    
  },
  containerCadastro: {
    width: '100%',
    height:'100%',
    flexDirection:'column' ,
    alignItems: 'center',  
    overflow:'hidden',
     
  },
  titulo2:{
    color: '#fff',
    fontSize: 35,
    fontWeight: '900',
  },
  pessoais:{
        color:'#004AAD',
  },
  input:{
    width:280,
    height:60,
    position:'relative',
    top:30
  
   },
  
 
  button2:{
    backgroundColor:'#004AAD',
    borderRadius:25,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    marginTop:'10%',
    marginLeft:'22%',
    width:160,  
  },
  buttonText2:{
    color:'#fff',
    fontSize:20,
    fontWeight:'bold'
  },


  title2:{
    fontSize:20,
    marginTop:20,
    color:'#004AAD',
    fontWeight:'bold',
 

  },

  // códigos input 
  title3:{
  fontSize:20,
  marginTop:5,
  color:'#fff',
  fontWeight:'bold',
 
  },

  input3:{
  borderBottomWidth:5,
  borderColor: '#fff',
  height:40,
  marginBottom:10,
  fontSize:16,
  color:'#fff',
  paddingHorizontal:10,
  },
});

export default styles;
