import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


export default function Home({navigation}){

  const handleLogin = () => {
    navigation.navigate('Login');
  };
  return(
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <View style={{ position: 'absolute', top: 20, left: 20, width: '66%' , flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            style={{ flex: 1, height: 35, borderColor: 'gray', borderWidth: 1, marginRight: 10, paddingLeft: 10 }}
            placeholder="Mẫ Vận đơn ..."
          />
          <TouchableOpacity onPress={() => alert("Chưa nhập nội dung !!!")} style={{ padding: 10,backgroundColor: 'green'  }}>
            <AntDesign name="search" size={15} color="black" />
          </TouchableOpacity>
        </View>
         
         <TouchableOpacity style={{ position: 'absolute', top: 20, right: 20 }} onPress={handleLogin}>
            <Text style={{ fontSize: 16, color: 'blue' }}>Login</Text>
        </TouchableOpacity>
    </View>
  );
}
