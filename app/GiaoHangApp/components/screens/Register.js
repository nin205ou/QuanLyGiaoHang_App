import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
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

      formData.append('first_name', fullName.substring(0, fullName.lastIndexOf(' ')));
      formData.append('last_name', fullName.substring(fullName.lastIndexOf(' ') + 1));
      formData.append('username', userName);
      formData.append('email', email);
      formData.append('phone_number', phoneNumber);
      formData.append('address', address);
      formData.append('avatar', avatar);
      formData.append('cccd', cccd);
      formData.append('password', password);
      formData.append('role', userType);

      register(
        formData,
        () => {
          navigation.navigate('Login');
          ToastAndroid.showWithGravity('Đăng ký thành công', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
        },
        ( message ) => {
          showToast(message, 'error');
        }
      );
    }
  };
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const showToast = (message, status, position = 'bottom') => {
    Toast.show({
      type: status,
      position: position,
      text1: message,
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  }

  const validation = () => {
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (fullName === '' || userName === '' || email === '' || phoneNumber === '' || address === '' || password === '' || confirmPassword === '' || userType === '') {
      showToast('Vui lòng nhập đầy đủ thông tin', 'error');
      return false;
    }
    if (!phoneRegex.test(phoneNumber)) {
      showToast('Số điện thoại không hợp lệ', 'error');
      return false;
    }
    if (!emailRegex.test(email)) {
      showToast('Email không hợp lệ', 'error');
      return false;
    }
    if (password !== confirmPassword) {
      showToast('Mật khẩu không khớp', 'error');
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
        onValueChange={(value) => setUserType(value === 'Customer' ? 2 : 3)}
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
