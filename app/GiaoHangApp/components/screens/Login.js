import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { AuthContext } from '../../context/authContext';
import Toast from 'react-native-toast-message';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login } = React.useContext(AuthContext);

  const handleLogin = () => {
    if (!validation()) return;
    login(
      username,
      password,
      () => {
        navigation.navigate('Home');
        ToastAndroid.showWithGravity('Đăng nhập thành công', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
      },
      () => Toast.show(
        {
          type: 'error',
          position: 'bottom',
          text1: 'Đăng nhập thất bại',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        }
      )
    )
  };


  const handleRegister = () => {
    navigation.navigate('Register');
  };
const handleAdmin = () => {
    navigation.navigate('Admin');
  }; 
 const handleShipper = () => {
    navigation.navigate('Shipper');
  }; 
  const handleUser = () => {
    navigation.navigate('User');
  }; 

  const validation = () => {
    if (username === '' || password === '') {
      Toast.show(
        {
          type: 'error',
          position: 'bottom',
          text1: 'Vui lòng nhập đầy đủ thông tin',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        }
      )
      return false;
    }
    return true;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingRight: 15, paddingLeft: 15 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Đăng nhập</Text>
      <TextInput
        placeholder="Tên đăng nhập"
        style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        placeholder="Mật khẩu"
        secureTextEntry={true}
        style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <View style={{width: '100%', alignItems: 'flex-end'}}>
        <TouchableOpacity>
          <Text style={{ fontSize: 12, color: 'green', marginBottom: 8}} >Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleAdmin} style={{ width: '100%', paddingTop: 10, paddingBottom: 10, backgroundColor: 'green', borderRadius: 5, alignItems: 'center' }}>
        <Text style={{ fontSize: 14, color: 'white' }}>Đăng nhập</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 12, color: 'gray', marginTop: 16 }} >Hoặc đăng nhập bằng</Text>
      <View style={{ width: '100%', flexDirection: 'row', marginTop: 16, justifyContent: 'space-around' }}>
        <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 8, backgroundColor: 'green', borderRadius: 8}}>
          <Text style={{ fontSize: 14, color: 'white' }}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 8, backgroundColor: 'green', borderRadius: 8}}>
          <Text style={{ fontSize: 14, color: 'white' }}>Facebook</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 20, flexDirection:'row'}}>
        <Text style={{ fontSize: 12}}>Chưa có tài khoản? </Text>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={{ fontSize: 12, color: 'green' }}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
}
