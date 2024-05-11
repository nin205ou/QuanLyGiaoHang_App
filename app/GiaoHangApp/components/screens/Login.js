import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { AuthContext } from '../../context/authContext';
import { Toast, showToast } from '../../static/js/toast';
import Button from '../static/Button'

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
        showToast('Đăng nhập thành công', 'success');
        setTimeout(() => {
          navigation.navigate('Home');
        }, 2100);
      },
      ( message ) => showToast(message, 'error')
    )
  };


  const handleRegister = () => {
    navigation.navigate('Register');
  };
const handleAdmin = () => {
    navigation.navigate('Admin');
  }; 

  const validation = () => {
    if (username === '' || password === '') {
      showToast('Please enter full information', 'error')
      return false;
    }
    return true;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15}}>
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
      <Button title="Đăng nhập" onPress={handleLogin} />
      <Text style={{ fontSize: 12, color: 'gray', marginTop: 16 }} >Hoặc đăng nhập bằng</Text>
      <View style={{ width: '100%', flexDirection: 'row', marginTop: 16, justifyContent: 'space-around' }}>
        <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 8, backgroundColor: '#D65B5A', borderRadius: 8}}>
          <Text style={{ fontSize: 14, color: 'white' }}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 8, backgroundColor: '#256EA3', borderRadius: 8}}>
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
