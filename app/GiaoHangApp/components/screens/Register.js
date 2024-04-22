import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import PickerSelect from 'react-native-picker-select';

import Login from './Login';

export default function Register({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');

  const handleRegister = () => {
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Phone Number:', phoneNumber);
    console.log('Address:', address);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    console.log('User Type:', userType);
  };
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Đăng ký</Text>
      <TextInput
        placeholder="Họ và tên"
        style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={fullName}
        onChangeText={text => setFullName(text)}
      />
      <TextInput
        placeholder="Email"
        style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Số điện thoại"
        style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      <TextInput
        placeholder="Địa chỉ"
        style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={address}
        onChangeText={text => setAddress(text)}
      />
      <TextInput
        placeholder="Mật khẩu"
        secureTextEntry={true}
        style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        placeholder="Xác nhận mật khẩu"
        secureTextEntry={true}
        style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />
      <PickerSelect
        placeholder={{ label: 'Chọn loại tài khoản', value: null }}
        onValueChange={(value) => setUserType(value)}
        items={[
          { label: 'Người dùng', value: 'user' },
          { label: 'Shipper', value: 'shipper' },
        ]}
        style={{ inputAndroid: { width: 300, height: 40, borderWidth: 1, borderColor: 'gray', marginBottom: 10, paddingHorizontal: 10 } }}
      />
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
      <TouchableOpacity onPress={handleLogin} style={{ marginRight: 10, padding: 10, backgroundColor: 'green', borderRadius: 5 }}>
          <Text style={{ fontSize: 16, color: 'white' }}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister} style={{ padding: 10, backgroundColor: 'green', borderRadius: 5 }}>
          <Text style={{ fontSize: 16, color: 'white' }}>Đăng ký</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}
