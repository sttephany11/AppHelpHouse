import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',     
  },
  fundo: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FF8F49',
   
  },
  scrollContainer: {

},
  title: {
    width: '100%',
    marginTop:'10%',
    justifyContent: 'flex-end',
    alignItems: 'center',    
    height:'14%'
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
    marginEnd:'11%'
  },
  
  titulo3:{
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    marginTop:8,
    marginLeft:5
  },
  passos:{
        color:'#fff'
  },
  input:{
    width:280,
    height:60,
    position:'relative',
    top:60
  
   },
   buttonCad:{
    marginTop:'30%',
    marginLeft:'22%',
    width:160,
    color:'#004AAD',
   
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
  },
  buttonText2:{
    color:'#fff',
    fontSize:20,
    fontWeight:'bold'
  },



  //view de rua e num
  inputRow: {
    flexDirection: 'row',  // Coloca os inputs em uma linha
    width: 190,      // Usa todo o espaço disponível
    alignItems: 'center',  // Alinha verticalmente os inputs
  },
  inputNum: {
    width: 69,
    marginLeft: 20,
    flexDirection:'column',
    marginRight:10,
  },

  //buton buscar cep 
  buttonEnviar: {
  margin:10,
  }

});

export default styles;
