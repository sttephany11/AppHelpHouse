import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#efefef',
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
  height:520,
  backgroundColor:'#e9e9e7',
  marginLeft:15,
  marginTop:10,
  borderRadius: 20,
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
  backgroundColor: '#004aad',
  justifyContent:'center',
  alignItems:'center',
  width:340,
  height:50,
  borderTopLeftRadius: 20, 
  borderTopRightRadius: 20,
},
tituloModal:{
  color:'#fff',
  fontWeight:'bold',
  fontSize:18,

},
tituloModal2:{
  color:'#fff',
  fontWeight:'bold',
  fontSize:18,
  justifyContent:'center',
  
 
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


navContent:{
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  width:393,
  height:50,
  marginTop:110,
  marginRight:20,
  
  
},
navbar:{
  backgroundColor:'#004aad',
  height:50,
  width:380,
  borderRadius:20,
  justifyContent:'flex-start',
  flexDirection:'row',
  alignItems:'center',
  zIndex:2,
  marginRight:20,
  marginTop:3,
},

textNav:{
  fontSize:25,
  color:'#fefefe',
  fontWeight:'bold',
  marginLeft:15,
},
navContainer:{
  width:'100%',
  height:140
},
tabs: {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems:'flex-start',
  width:330,
  height:60,
  backgroundColor: '#fff',
  padding: 8,
  borderRadius: 13,
  marginLeft:20,
  bottom:20
},
Texttab: {
  color: '#ff914d',
  fontSize: 20,
  top:20,
  fontWeight:'bold',
  marginLeft:10,
},
tab2: {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems:'flex-start',
  width:180,
  height:60,
  backgroundColor: '#fff',
  padding: 8,
  borderRadius: 13,
  marginBottom: 5,
  marginLeft:180,
  zIndex:1,
  bottom:80
},

nomes:{
  color: '#004aad',
  fontSize: 18,
  fontWeight:'bold',
  marginLeft:30,
  marginTop:20,
},
variaveis:{
  color: 'black',
  fontSize: 18,
  fontWeight:'bold',
  marginLeft:5,
  marginTop:20,
},
nomes2:{
  color: '#004aad',
  fontSize: 18,
  fontWeight:'bold',
  marginLeft:30,
  marginTop:10,
},
variaveis2:{
  color: 'black',
  fontSize: 18,
  fontWeight:'bold',
  marginLeft:5,
  marginTop:10,
},
buttonFinal:{
  width:100,
  height:40,
  backgroundColor:'white',

},
buttonFinal2:{
  width:100,
  height:40,
  marginLeft:30,
  backgroundColor:'white',

},
textButtonFinal:{
  color: 'black',
  fontSize: 20,
  marginLeft:13,
  top:8,
  fontWeight:'bold',
},
textButtonFinal2:{
  color: 'black',
  fontSize: 20,
  marginLeft:10,
  top:8,
  fontWeight:'bold',
},



});

export default styles;
