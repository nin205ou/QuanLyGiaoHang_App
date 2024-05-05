import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { AuthContext } from '../../context/authContext';


export default function Home({ navigation }) {
  const { userToken, userInfor } = React.useContext(AuthContext)
  // console.log(userToken);
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ position: 'absolute', top: 20, left: 20, width: '66%', flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1, height: 35, borderColor: 'gray', borderWidth: 1, marginRight: 10, paddingLeft: 10 }}
          placeholder="Mã Vận đơn ..."
        />
        <TouchableOpacity onPress={() => alert("Chưa nhập nội dung !!!")} style={{ padding: 10, backgroundColor: 'green' }}>
          <EvilIcons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {
        (userToken === null ? (
          <TouchableOpacity style={{ position: 'absolute', top: 20, right: 20 }} onPress={handleLogin}>
            <Text style={{ fontSize: 16, color: 'blue' }}>Login</Text>
          </TouchableOpacity>) : (
          <TouchableOpacity style={{ position: 'absolute', top: 20, right: 25 }} onPress={() => {navigation.navigate('Info')}}>
            <Text style={{ fontSize: 14, color: 'gray' }}>Xin chào, </Text>
            <Text style={{ fontSize: 14, color: 'green' }}>{userInfor.username}</Text>
          </TouchableOpacity>
        ))
      }

    </View>
  );
}
