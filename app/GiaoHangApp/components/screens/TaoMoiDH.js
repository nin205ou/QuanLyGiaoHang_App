import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';


export default function TaoMoiDH({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [fullNameNhan, setFullNameNhan] = useState('');
  const [phoneNumberNhan, setPhoneNumberNhan] = useState('');
  const [addressNhan, setAddressNhan] = useState('');
  const [description, setdescription] = useState('');
 
  const handleTaoMoiDH = () => {
    console.log('Full Name:', fullName);
    console.log('Phone Number:', phoneNumber);
    console.log('Address:', address);
    console.log('Full Name Nhan:', fullNameNhan);
    console.log('Phone Number Nhan:', phoneNumberNhan);
    console.log('Address Nhan:', addressNhan);
    console.log('description:', description);
   
  };
  const handleDonHang = () => {
    navigation.navigate('DonHang');
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Tạo mới đơn hàng </Text>
      <TextInput
        placeholder="Họ và tên người gửi "
        style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={fullName}
        onChangeText={text => setFullName(text)}
      />
      <TextInput
        placeholder="Số điện thoại người gửi"
        style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      <TextInput
        placeholder="Địa chỉ người gửi"
        style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={address}
        onChangeText={text => setAddress(text)}
      />

    <TextInput
        placeholder="Họ và tên người nhận "
        style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={fullNameNhan}
        onChangeText={text => setFullNameNhan(text)}
      />
      <TextInput
        placeholder="Số điện thoại người nhận"
        style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={phoneNumberNhan}
        onChangeText={text => setPhoneNumberNhan(text)}
      />
      <TextInput
        placeholder="Địa chỉ người nhận"
        style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={addressNhan}
        onChangeText={text => setAddressNhan(text)}
      />
      <TextInput
        placeholder="Thông tin mô tả gói hàng "
        style={{ width: 300, height: 100, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={description}
        onChangeText={text => description(text)}
      />
     
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
      <TouchableOpacity onPress={handleDonHang}  style={{ marginRight: 10, padding: 10, backgroundColor: 'green', borderRadius: 5 }}>
          <Text style={{ fontSize: 16, color: 'white' }}>Tạo mới </Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}
