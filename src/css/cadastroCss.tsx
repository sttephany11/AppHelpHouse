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
    borderRadius: 310,
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
    width:'49%',
    height:600,
    position:'relative',
    top:30,
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
  title2:{
    fontSize:20,
    marginTop:20,
    color:'#004AAD',
    fontWeight:'bold',

  },

  // códigos input 
  title3:{
    fontWeight:'700',
    color: 'white',
    marginBottom:15,
    fontSize:18,
    right:2,
    top:9
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
});

export default styles;
