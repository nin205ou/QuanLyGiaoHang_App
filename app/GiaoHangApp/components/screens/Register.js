import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import PickerSelect from 'react-native-picker-select';
import Toast from 'react-native-toast-message';
import { AuthContext } from '../../context/authContext';

export default function Register({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState('');
  const [cccd, setCCCD] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');

  const { register } = React.useContext(AuthContext)

  const handleRegister = () => {
    if (validation()) {
      const formData = new FormData();

      formData.append('first_name', fullName);
      formData.append('username', userName);
      formData.append('email', email);
      formData.append('phone_number', phoneNumber);
      formData.append('address', address);
      formData.append('avatar', avatar);
      // formData.append('cccd', cccd);
      formData.append('password', password);
      formData.append('role', 2);

      register(
        formData,
        () => {
          navigation.navigate('Login');
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Đăng ký thành công',
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        },
        () => {
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Đăng ký thất bại',
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        }
      );
    }
  };
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const validation = () => {
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (fullName === '' || userName === '' || email === '' || phoneNumber === '' || address === '' || password === '' || confirmPassword === '' || userType === '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Vui lòng nhập đầy đủ thông tin',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      return false;
    }
    if (!phoneRegex.test(phoneNumber)) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Số điện thoại không hợp lệ',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      return false;
    }
    if (!emailRegex.test(email)) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Email không hợp lệ',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      return false;
    }
    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Mật khẩu không khớp',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      return false;
    }
    return true;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Đăng ký</Text>
      <TextInput
        placeholder="Họ và tên"
        style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={fullName}
        onChangeText={text => setFullName(text)}
      />
      <TextInput
        placeholder="Tên đăng nhập"
        style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={userName}
        onChangeText={text => setUserName(text)}
      />
      <TextInput
        placeholder="Email"
        style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Số điện thoại"
        style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={phoneNumber}
        maxLength={10}
        onChangeText={text => setPhoneNumber(text)}
      />
      <TextInput
        placeholder="Địa chỉ"
        style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={address}
        onChangeText={text => setAddress(text)}
      />
      <TextInput
        placeholder="Mật khẩu"
        secureTextEntry={true}
        style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      {
        (userType === 'Shipper') && (
          <TextInput
            placeholder="Số CCCD"
            style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
            value={cccd}
            maxLength={12}
            onChangeText={text => setCCCD(text)}
          />
        )
      }
      <TextInput
        placeholder="Xác nhận mật khẩu"
        secureTextEntry={true}
        style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />
      <PickerSelect
        placeholder={{ label: 'Chọn loại tài khoản', value: null }}
        onValueChange={(value) => setUserType(value)}
        items={[
          { label: 'Khách hàng', value: 'Customer'},
          { label: 'Shipper', value: 'Shipper'},
        ]}
        style={{ inputAndroid: { width: '100%', height: 40, borderWidth: 1, borderColor: 'gray', marginBottom: 10, paddingHorizontal: 10 } }}
      />
     <TouchableOpacity onPress={handleRegister} style={{ width: '100%', paddingTop: 10, paddingBottom: 10, backgroundColor: 'green', borderRadius: 5, alignItems: 'center' }}>
        <Text style={{ fontSize: 14, color: 'white' }}>Đăng ký</Text>
      </TouchableOpacity>
      <View style={{marginTop: 20, flexDirection:'row'}}>
        <Text style={{ fontSize: 12}}>Đã có tài khoản? </Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={{ fontSize: 12, color: 'green' }}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
}
