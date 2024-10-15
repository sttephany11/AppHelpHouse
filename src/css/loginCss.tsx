import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },

      help:{
        width:300,
        height:300,
       
      },
     input:{
      width:280,
      height:60,
      marginBottom:40,
    
     },
     button:{ 
        width:160,
        color:'#004AAD'
     },
      inputFocused:{
     position:'absolute',
        fontSize:20,
        color:'#FF8F49',
        margin:0,
        marginLeft:20,
        backgroundColor:'#000'
        
      },
      
      label:{
      position:'relative',
      fontSize:18,
      color:'#FF8F49',

      },
      conta:{
          top:70,
      },
      helpText:{
        color:'#004AAD'
      },
      houseText:{
        color:'#F6A059'
      },
      buttonCad:{
        marginTop:'10%',
        width:160,
        color:'#004AAD'
      },
      errorMessage:{
        color:'#FF0000'
      },
      
      button2:{
        backgroundColor:'#004AAD',
        borderRadius:25,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        marginTop:80,
        width:160,  
        shadowColor: 'black',
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 9 },
        shadowOpacity: 0.5,
        
      },
      button3:{
        backgroundColor:'#FF8F49',
        borderRadius:25,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
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
   
});

export default styles;
