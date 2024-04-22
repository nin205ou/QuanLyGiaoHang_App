import * as React from 'react';
import { View,Text,TouchableOpacity } from 'react-native';


export default function Home({navigation}){

  const handleLogin = () => {
    navigation.navigate('Login');
  };
  return(
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
         <Text onPress={() => alert("this home")} style={{ fontSize: 26, fontWeight: 'bold' }}>Home</Text>
         
         <TouchableOpacity style={{ position: 'absolute', top: 20, right: 20 }} onPress={handleLogin}>
            <Text style={{ fontSize: 16, color: 'blue' }}>Login</Text>
        </TouchableOpacity>
    </View>
  );
}