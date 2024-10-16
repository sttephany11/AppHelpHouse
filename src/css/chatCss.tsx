import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#efefef'
  },
  navChat:{
    backgroundColor:'#ffffff',
    width:393,
    height:230,
    display:'flex'
  },
  navContent:{
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'center',
    width:393,
    height:150,
    marginTop:30,
  },

  mensagensContainer: {
    flex: 1,
    padding: 10,
    marginBottom: 20, // Espaço para o input de mensagem
    height:'100%'
  },
  mensagemItem: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    maxWidth: '80%',
  },
  navbar:{
    backgroundColor:'#004aad',
    height:50,
    width:393,
    borderRadius:10,
    justifyContent:'flex-start',
    flexDirection:'row',
    alignItems:'center'
  },
  textNav:{
    fontSize:25,
    color:'#fefefe',
    fontWeight:'bold',
    marginLeft:30,

  },
  confirmarTrampo:{
    justifyContent:'flex-start',
    height:120,
    width:393,
    flexDirection:'column',

  },
  infoPessoa:{
    flexDirection:'row'
  },
  foto:{
    width:60,
    height:60,
    borderRadius:100,
    backgroundColor:'black',
    marginLeft:20,
    marginTop:10,
  },
  textName:{
    position:'relative',
    top:25,
    marginLeft:20,
    fontSize:20,
    fontWeight:'bold',
  },
  buttons:{
    marginTop:20,
    flexDirection:'row',
    marginLeft:10,
  },
  Negar:{
    width:180,
    height:50,

    backgroundColor:'#e60012'

  },
  fecharNegocio:{
    width:180,
    height:50,
    marginRight:10,
    backgroundColor:'#00bf63'
  },
  enviarMensagem:{
    display:'flex',
    alignItems:'center',
    justifyContent:'flex-end',
   
    width: 393,
    height:580,
  },
  inputContent:{
    backgroundColor:'#ffffff', 
    height:80,
    width:393,
    justifyContent: 'flex-start', 
    padding: 10, 
    flexDirection:'row',

  },
  input: {
    height: 50,
    borderColor: '#cccccc',
    borderWidth: 1, 
    borderRadius: 10, 
    paddingHorizontal: 15, 
    fontSize: 16, 
    backgroundColor: '#f9f9f9', 
    width:300,
    marginBottom:2,
  },
  enviar:{
    width:60,
    height:60,
    backgroundColor:'#14b2f7',
    borderRadius:20,
    marginLeft:10,
    position:'relative',
    bottom:3,
    alignItems:'center',
    justifyContent:'center'

    
  },
  icon:{
    width: 25, // Ajuste o tamanho do ícone conforme necessário
    height: 25,
  }

});

export default styles;
