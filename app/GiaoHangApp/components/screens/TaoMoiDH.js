import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Apis, { authApi, endpoints } from "../../Apis";
import Button from '../static/Button';
import PickerSelect from 'react-native-picker-select';
import { AuthContext } from '../../context/authContext';
import { Toast, showToast } from '../../static/js/toast';
import * as formValidate from '../../static/js/validationFunc'

export default function TaoMoiDH({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [collection, setCollection] = useState('');
  const [image, setImage] = useState(null);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [startPrice, setStartPrice] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState('');

  const { userToken, userInfor } = React.useContext(AuthContext);

  const fetchPaymentMethods = async () => {
    const response = await authApi(userToken).get(endpoints['payment_methods']);
    setPaymentMethods(response.data);
  }

  React.useEffect(() => {
    fetchPaymentMethods();
  }, [])

  const handleSelectImage = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      setImage(image);
    });
  }

  const handleSubmit = async () => {
    if (!userInfor.userId) {
      showToast('Vui lòng đăng nhập để tạo đơn hàng', 'error');
      return;
    }
    if (!validation()) return;
    const formData = {
      user: userInfor.userId,
      name: name,
      description: description,
      weight: weight,
      source: source,
      destination: destination,
      collection: collection,
      phone_number_giver: phoneNumber,
      start_price: startPrice,
      current_price: startPrice,
      type_payment: selectedPayment
    }
    // Nếu có image
    // if (image) {
    //   formData.append('image', {
    //     uri: Platform.OS === 'android' ? image.path : image.uri,  //  Xử lý đường dẫn ảnh phù hợp với Platform
    //     type: image.mime,
    //     name: 'auction_image.jpg' // Cần đảm bảo tên ảnh phù hợp với model
    //   });
    // }
    try {
      const response = await authApi(userToken).post(endpoints['auctions'], JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.id) {
        showToast('Tạo đơn hàng thành công', 'success');
        setTimeout(() => {
          navigation.navigate('DonHang');
        }, 2100);
      }
    } catch (error) {
      let errorMessage = error.response.data.error_description || error.response.data.detail || error.response.data.error || error.message;
      showToast(errorMessage, 'error');
    }
  };

  const validation = () => {
    if (name === '' || description === '' || weight === '' || source === '' || destination === '' || collection === '' || phoneNumber === '' || startPrice === '') {
      showToast('Vui lòng nhập đầy đủ thông tin', 'error');
      return false;
    }

    if(selectedPayment === '' || selectedPayment === null){
      showToast('Vui lòng chọn phương thức thanh toán', 'error');
      return false;
    }

    if(!formValidate.phoneValidation(phoneNumber)){
      showToast('Số điện thoại không hợp lệ', 'error');
      return false;
    }

    if(startPrice <= 0){
      showToast('Giá khởi điểm không hợp lệ', 'error');
      return false;
    }

    return true;
  }

  return (
    <View style={{ paddingHorizontal: 15, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Tạo đơn đấu giá mới </Text>
      <TextInput
        placeholder="Tên đơn hàng"
        style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        placeholder="Mô tả"
        style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={description}
        onChangeText={text => setDescription(text)}
      />
      <TextInput
        placeholder="Khối lượng"
        style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={weight}
        onChangeText={text => setWeight(text)}
      />
      <TextInput
        placeholder="Điểm nhận hàng"
        style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={source}
        onChangeText={text => setSource(text)}
      />
      <TextInput
        placeholder="Điểm giao hàng"
        style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={destination}
        onChangeText={text => setDestination(text)}
      />
      <TextInput
        placeholder="Số tiền thu hộ"
        style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={collection}
        onChangeText={text => setCollection(text)}
      />
      <TextInput
        placeholder="Số điện thoại"
        style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={phoneNumber}
        maxLength={10}
        onChangeText={text => setPhoneNumber(text)}
      />
      {/* <TouchableOpacity onPress={handleSelectImage} style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Chọn ảnh</Text>
      </TouchableOpacity> */}
      <PickerSelect
        placeholder={{ label: 'Phương thức thanh toán', value: null }}
        onValueChange={value => setSelectedPayment(value)}
        items={paymentMethods.map(method => ({ label: method.name, value: method.id }))}
        value={selectedPayment}
      />
      <TextInput
        placeholder="Giá khởi điểm"
        style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={startPrice}
        onChangeText={text => setStartPrice(text)}
      />

      <Button title="Tạo đơn" onPress={handleSubmit} />
      <Toast/>
    </View>
  );
}
