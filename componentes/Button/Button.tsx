import React from "react";
import { TouchableOpacity,
     Text,
      StyleSheet,
      ActivityIndicator,
      View,
      StyleProp,
      ViewStyle  
    } from "react-native";

    import Entypo from '@expo/vector-icons/Entypo'
    import Octicons from '@expo/vector-icons/Octicons';
    import AntDesign from '@expo/vector-icons/AntDesign';
    import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
    import Feather from '@expo/vector-icons/Feather';
    import Ionicons from '@expo/vector-icons/Ionicons';
    import { variants } from "./variantes";
import { Float } from "react-native/Libraries/Types/CodegenTypes";


//  <Feather name="smartphone" size={24} color="black" />
// <AntDesign name="google" size={24} color="black" />
// <FontAwesome5 name="facebook" size={24} color="black" />



interface ButtonProps {
    title: String;
    onPress: () =>void
    isLoading?: boolean;
    disabled?: boolean;
    iconName?: keyof typeof AntDesign.glyphMap;
    iconName1?: keyof typeof FontAwesome5.glyphMap;
    iconName2?: keyof typeof Feather.glyphMap;
    iconName3?: keyof typeof Ionicons.glyphMap;
    iconName4?: keyof typeof Octicons.glyphMap;
    iconName5?: keyof typeof Entypo.glyphMap;
    // as variantes estão na linha 67 da pasta variants.ts
    variant?: 'primary' | 'outline' | 'noBorder'| 'home';
    style?: StyleProp<ViewStyle>;
    color?: string; 
    size?: Float;
}

export function Button ({
    title, 
    onPress, 
    isLoading= false,
    iconName,
    iconName1,
    iconName2,
    iconName3,
    iconName4,
    iconName5,
    variant = 'primary',
    disabled,
    style,
    color,
    size, 
    }: 
    ButtonProps){
    const buttonVariant = variants[variant];
    // const backgroundColor = disabled ? '#B8B8B8' : 'white'
    const ButtonStyle = disabled? buttonVariant.disable : buttonVariant.enable
   
    return (
            <TouchableOpacity 
            disabled={isLoading || disabled}
            onPress={onPress} 
            style={[styles.container, { ...ButtonStyle.button}, style ]}>
               {isLoading? (
               <ActivityIndicator color="#fff"/>
               ):(  
                
                <View style={styles.content}>
               {iconName &&    <AntDesign 
                    style={{fontSize:size}} 
                     color={color}
                     name={iconName}
                      />}

                       {iconName1 &&    <FontAwesome5
                     style={{fontSize:18}} 
                     color={color}
                     name={iconName1}
                      />}

                       {iconName2 &&    <Feather
                     style={{fontSize:size}} 
                     color={color}
                     name={iconName2}
                      />}
                      {iconName3 &&    <Ionicons
                    style={{fontSize:size}} 
                      color={color}
                     name={iconName3}
                      />}
                      {iconName4 &&    <Octicons
                     style={{fontSize:22}} 
                      color={color}
                       name={iconName4}
                      />}
                      {iconName5 &&    <Entypo
                     style={{fontSize:22}} 
                      color={color}
                       name={iconName5}
                      />}
                <Text style={[styles.title, {color: ButtonStyle.title.color}]}>
                    {title}
                    </Text> 
               </View>
               )}


            </TouchableOpacity>
    );    
}




const styles  = StyleSheet.create({
    container:{
        padding:16,
        borderRadius:30,
        height:50,
        width:'100%',
      
        
        
    },
    title:{
        display:'flex',
        textAlign:'center',
        fontWeight:'500',
        justifyContent:'center',
     
        
           
    
      
        
    },
    content: {
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'center',
        textAlign:'center',
     
    },
    
    

});