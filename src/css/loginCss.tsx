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
          marginTop:'10%'
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
      }
      
   
   
});

export default styles;
