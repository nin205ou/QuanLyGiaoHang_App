import * as React from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { AuthContext } from '../../context/authContext';
import { Toast, showToast } from '../../static/js/toast';


export default function Info({ navigation }) {
  const { logout, userToken } = React.useContext(AuthContext);

  const handleLogin = () => {
    navigation.navigate('Login');
  }

  const handleLogout = () => {
    logout(
      () => {
        showToast('Đăng xuất thành công', 'success')
        setTimeout(() => {
          navigation.navigate('Home');
        }, 2100);
      },
      (message) => showToast(message, 'error')
    );
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
      <Text
        onPress={() => navigation.navigate('Home')}
        style={{ fontSize: 26, fontWeight: 'bold' }}>Information</Text>
      <TouchableOpacity onPress={userToken ? handleLogout : handleLogin} style={{ width: '100%', marginTop: 20, paddingVertical: 8, backgroundColor: 'green', borderRadius: 10, alignItems: 'center' }}>
        <Text style={{ fontSize: 14, color: 'white' }}>{userToken ? 'Đăng xuất' : 'Đăng nhập'}</Text>
      </TouchableOpacity>
      <Toast/>
    </View>
  );
}