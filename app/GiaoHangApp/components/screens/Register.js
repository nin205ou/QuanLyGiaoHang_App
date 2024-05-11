import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import PickerSelect from 'react-native-picker-select';
import { AuthContext } from '../../context/authContext';
import { Toast, showToast } from '../../static/js/toast';
import * as formValidate from '../../static/js/validationFunc'
import Button from '../static/Button'

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
          showToast('Đăng ký thành công', 'success')
          setTimeout(() => {
            navigation.navigate('Login');
          }, 2100);
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

  const validation = () => {
    if (fullName === '' || userName === '' || email === '' || phoneNumber === '' || address === '' || password === '' || confirmPassword === '' || userType === '') {
      showToast('Vui lòng nhập đầy đủ thông tin', 'error');
      return false;
    }
    if (userType == 3) {
      let cccdValidationMessage = formValidate.cccdValidation(cccd);
      if (cccdValidationMessage != 'Validated') {
        showToast(cccdValidationMessage, 'error');
        return false;
      }
    }
    
    if (!formValidate.phoneValidation(phoneNumber)) {
      showToast('Số điện thoại không hợp lệ', 'error');
      return false;
    }
    if (!formValidate.emailValidation(email)) {
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
        (userType === 3) && (
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
      <Button title="Đăng ký" onPress={handleRegister} />
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