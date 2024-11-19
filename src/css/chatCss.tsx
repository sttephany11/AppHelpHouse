import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#efefef',
  },
  navChat: {
    width: '100%',
    height: 230,
    display: 'flex',
  },
  navContent: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 150,
    marginTop: 30,
  },
  mensagensContainer: {
    flex: 1, // Ocupa todo o espaço disponível
    padding: 10,
    marginBottom: 20, // Espaço para o input de mensagem
  },
  mensagemItem: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    maxWidth: '90%', // Ajuste a largura máxima
  },
  navbar: {
    backgroundColor: '#FF6600',
    height: 50,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textNav: {
    fontSize: 25,
    color: '#fefefe',
    fontWeight: 'bold',
    marginLeft: 30,
  },
  enviarMensagem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: 80, // Reduzido para dar mais espaço às mensagens
  },
  inputContent: {
    backgroundColor: '#ffffff',
    height: 60,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 50,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    width: 300,
    marginBottom: 2,
  },
  enviar: {
    width: 50,
    height: 50,
    backgroundColor: '#14b2f7',
    borderRadius: 25,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20, // Ajuste o tamanho do ícone
    height: 20,
  },
  botaoPDF: {
    backgroundColor: '#004aad', // Verde
    paddingVertical: 10, // Use paddingVertical para ajustar a altura do botão
    paddingHorizontal:10, // Ajusta o padding lateral
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
    marginLeft:50,
  },
  textoBotao: {
    color: '#FFFFFF', // Branco
    fontSize: 16,
    fontWeight: 'bold',
  },
  onlineUsersContainer: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
},

onlineTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
},

onlineUser: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
},

//MODALLL
modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
  width: 300,
  padding: 20,
  backgroundColor: 'white',
  borderRadius: 10,
  alignItems: 'center',
},
starsContainer: {
  flexDirection: 'row',
  marginBottom: 20,
},
submitButton: {
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor: '#004aad',
  borderRadius: 5,
},
input2: {
  height: 40,
  width: 250,
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 8,
  padding: 10,
  marginTop: 15,
  marginBottom: 10,
  textAlignVertical: 'top', // Para que o texto comece no topo
},


//styles do modal contrato 

containerPedidos:{
  width:340,
  height:730,
  backgroundColor:'#e9e9e7',
  marginLeft:25,
  marginTop:60,
  borderRadius:25,
},
botaoAceitar: {
  backgroundColor: 'green',
  padding: 10,
  borderRadius: 30,
  width:130,
  height:50,
  marginLeft:25,
},
botaoRecusar: {
  backgroundColor: 'red',
  padding: 10,
  borderRadius: 30,
  width:130,
  height:50,
  marginRight:30
},

tituloFundo:{
  backgroundColor: '#bc000f',
  justifyContent:'center',
  alignItems:'center',
  width:340,
  height:50,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  flexDirection:'row',
},
tituloModal:{
  color:'#fff',
  fontWeight:'bold',
  fontSize:28,
 marginRight:160
},
tituloModal2:{
  color:'#545454',
  fontWeight:'bold',
  fontSize:17,
  justifyContent:'center',
  marginLeft:18,
  marginTop:15,
},
tituloModal3:{
  color:'#545454',
  fontWeight:'bold',
  fontSize:17,
  justifyContent:'center',
  marginLeft:18,
  
},
opcoes:{
  fontWeight:'bold',
  fontSize:20,
  justifyContent:'flex-start',
  marginLeft:35,
  marginTop:20,
  marginBottom:5,
  color:'#0044CC',
},
opcoes2:{
  fontWeight:'bold',
  fontSize:18,
  justifyContent:'flex-start',
  marginTop:20,

  marginBottom:5,
},


// check box 
container2: {
  padding: 20,
 
},
checkboxContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
},
label: {
  marginLeft: 10,
  fontSize: 16,
  color: '#333',
},


  input3:{
    borderBottomWidth:3,
    borderColor: '#545454',
    height:40,
    marginBottom:5,
    fontSize:16,
    color:'black',
    paddingHorizontal:5,
    width:300,
    marginLeft:20,
    bottom:20
  },

  anexo:{
  width:290,
  height:40,
  backgroundColor:'#a6a6a6',
  },
  iconAnexo:{
    marginLeft:20,
    top:5,
  },
  iconReportar:{

  },
  textAnexo:{
    marginLeft:20,
    top:9,
    fontSize:18,
    color:'#fff',
    fontWeight:'bold',
  },
  buttonEnviar:{

    backgroundColor:'#bc000f',
    width:125, 
    borderRadius:25,
    height:38,
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.5, 
    
  },
  buttonEnviar2:{
    backgroundColor:'#a6a6a6',
    width:100, 
    borderRadius:25,
    height:35,
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.5, 
    marginTop:15,
  },
  textButton:{
    fontSize:22,
    color:'#fff',
    fontWeight:'bold',
    marginLeft:25,
    top:7
  },
  textButton2:{
    fontSize:18,
    color:'#fff',
    fontWeight:'bold',
    marginLeft:10,
    top:7,
  },
});

export default styles;
