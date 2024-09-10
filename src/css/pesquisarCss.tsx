import {StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
 
  background: {
    flex: 1,
},

  fundoBranco:{
    backgroundColor:'#fff',
    width:370,
    borderRadius:25,
    marginTop:60,
    marginLeft:22,
    flex:1
},

containerInput:{
  alignItems:'center',
  justifyContent:'center',
},


textSugestao:{
    fontSize:18,
    fontWeight:'bold',
    color: '#004aad',
    marginTop:25,
    marginEnd:100,

},


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
  marginTop:25,
  paddingHorizontal: 20,
  paddingVertical: 10,
  height:50,
  width:300,
},
searchIcon: {
  marginRight: 10,
},
input: {
  flex: 1, // Ocupa o espaço restante
  borderColor:'black',
  color:'white',
  fontSize:16,
  fontWeight:'bold',
},

list:{
flex:1,
}

});

export default styles;