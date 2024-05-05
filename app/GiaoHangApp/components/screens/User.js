import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


export default function User({navigation}){

  const handleLogin = () => {
    navigation.navigate('Login');
  };
  return(
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text style={{ position: 'absolute', top: 70, left: 20, fontSize: 20, fontWeight: 'bold', color: 'black' }}>User</Text>
        <View style={{ position: 'absolute', top: 110, left: 20, width: '66%' , flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            style={{ flex: 1, height: 35, borderColor: 'gray', borderWidth: 1, marginRight: 10, paddingLeft: 10 }}
            placeholder="Mẫ Vận đơn ..."
          />
          <TouchableOpacity onPress={() => alert("Chưa nhập nội dung !!!")} style={{ padding: 10,backgroundColor: 'green'  }}>
          <Text style={{ fontSize: 16, color: 'blue' }}>Search</Text>
          </TouchableOpacity>
        </View>
            <TouchableOpacity style={{ position: 'absolute', top: 120, right: 20, marginLeft: 5 }} onPress={handleLogin}>
            <Text style={{ fontSize: 16, color: 'blue' }}>Logout</Text>
        </TouchableOpacity>
    </View>
  );
}
