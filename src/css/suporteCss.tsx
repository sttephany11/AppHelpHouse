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
    height:550,
    bottom:20,
},
TextSuporte:{
    fontSize:32,
    fontWeight:'bold',
    color:'#004aad',
    marginLeft:63,
    bottom:35,
},
titulo:{
    fontSize:37,
    color:'#fff',
    fontWeight:'bold',
    bottom:25,
},
subTitulo:{
    color:'#fff',
    fontWeight:'bold',
    bottom:28,
    fontSize:16,
    marginTop:10
},
subTitulo2:{
  color:'#004aad',
  fontWeight:'bold',
  bottom:8,
  fontSize:18,
},
subTitulo3:{
  color:'#004aad',
  bottom:28,
  fontSize:16,
  marginTop:2
},
subTitulo4:{
  color:'#004aad',
  fontWeight:'bold',
  bottom:3,
  fontSize:18,
  marginTop:10
},



problema:{
    fontSize:28,
    fontWeight:'bold',
    color:'#004aad',
    marginLeft:35,
    marginTop:15,
    marginBottom: 15,
},
problema2:{
  fontSize:24,
  fontWeight:'bold',
  color:'#004aad',
  marginLeft:25,
  marginTop:110,
  marginBottom: 30,
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


    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    faqItem: {
      marginBottom: 3,
      marginLeft:10
    },
    questionContainer: {
      padding: 5,
      borderRadius: 5,
      marginBottom: 5,
    },
    question: {
      fontSize: 16,
      fontWeight: 'bold',
      color:'#0044CC'
    },
    answer: {
      fontSize: 17,
      color: '#555',
      paddingHorizontal: 10,
      fontWeight: 'bold',
      marginBottom: 20,
    },

    iconEmail:{
marginRight:10,
bottom:7
    },
    
    iconWhats:{
      marginRight:10,
      bottom:7,
      marginTop:10
          },
});

export default styles;
