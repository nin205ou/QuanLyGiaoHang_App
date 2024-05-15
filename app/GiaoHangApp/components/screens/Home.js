import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import OrderItem from '../static/OrderItem'
import Apis, { authApi, endpoints } from "../../Apis";
import { Toast, showToast } from '../../static/js/toast';
import { AuthContext } from '../../context/authContext';


export default function Home({ navigation }) {
  const { userToken, userInfor, checkLogin } = React.useContext(AuthContext)
  const [orderId, setOrderId] = React.useState('');
  const [orderData, setOrderData] = React.useState({});
  const [isSearched, setIsSearched] = React.useState(false);

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  React.useEffect(() => {
    checkLogin();
  }, [userToken, isSearched])

  const handleSearchOrder = async () => {
    if (orderId === '') {
      showToast('Vui lòng nhập mã vận đơn', 'warning');
      return;
    }
    try {
      const response = await authApi(userToken).get(endpoints['orders'] + orderId)
      console.log(response.data);
      setOrderData(response.data);
      setIsSearched(true);
    } catch (error) {
      showToast("Không tìm thấy đơn hàng", 'error');
      setIsSearched(false);
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ position: 'absolute', top: 20, left: 20, width: '66%', flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          style={{ flex: 1, height: 35, borderColor: 'gray', borderWidth: 1, marginRight: 10, paddingLeft: 10 }}
          placeholder="Mã vận đơn ..."
          onChangeText={text => setOrderId(text)}
          value={orderId}
        />
        <TouchableOpacity onPress={handleSearchOrder} style={{ padding: 10, backgroundColor: 'green' }}>
          <EvilIcons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {
        (userToken === null ? (
          <TouchableOpacity style={{ position: 'absolute', top: 20, right: 20 }} onPress={handleLogin}>
            <Text style={{ fontSize: 16, color: 'blue' }}>Login</Text>
          </TouchableOpacity>) : (
          <TouchableOpacity style={{ position: 'absolute', top: 20, right: 25 }} onPress={() => {navigation.navigate('Infor')}}>
            <Text style={{ fontSize: 14, color: 'gray' }}>Xin chào, </Text>
            <Text style={{ fontSize: 14, color: 'green' }}>{userInfor.userName}</Text>
          </TouchableOpacity>
        ))
      }
      <View style={{height: 60}}></View>
      {
        isSearched ? <OrderItem item={orderData}/> : null
      }
      <Toast />
    </View>
  );
}
