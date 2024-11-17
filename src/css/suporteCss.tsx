import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  fundoBranco:{
    backgroundColor:'#fff',
    width:350,
    borderRadius:25,
    marginTop:5,
    marginLeft:22,
    flex:1
},
TextSuporte:{
    fontSize:32,
    fontWeight:'bold',
    color:'#004aad',
    marginLeft:63,
    bottom:35,
},
titulo:{
    fontSize:35,
    color:'#fff',
    fontWeight:'bold',
    bottom:25,
},
subTitulo:{
    color:'#fff',
    fontWeight:'bold',
    bottom:25,
    fontSize:15,
},
problema:{
    fontSize:25,
    fontWeight:'bold',
    color:'#004aad',
    marginLeft:35,
    marginTop:15,
},
container: {
    padding: 20,
    backgroundColor: '#fff',
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
      borderColor: '#004aad',
      height:40,
      marginBottom:5,
      fontSize:16,
      color:'black',
      paddingHorizontal:5,
      width:300,
      marginLeft:20,
      bottom:20
    },
});

export default styles;
