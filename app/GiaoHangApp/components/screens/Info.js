import * as React from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { AuthContext } from '../../context/authContext';


export default function Info({ navigation }) {
  const { logout } = React.useContext(AuthContext);

  const handleLogout = () => {
    logout(
      () => {
        navigation.navigate('Login')
        ToastAndroid.showWithGravity('Đăng xuất thành công', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
      },
      () => alert('Đăng xuất thất bại')
    );
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
      <Text
        onPress={() => navigation.navigate('Home')}
        style={{ fontSize: 26, fontWeight: 'bold' }}>Information</Text>
      <TouchableOpacity onPress={handleLogout} style={{ width: '100%', marginTop: 20, paddingVertical: 8, backgroundColor: 'green', borderRadius: 10, alignItems: 'center' }}>
        <Text style={{ fontSize: 14, color: 'white' }}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}