import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign'; 

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import QuanLyShipper from './QuanLyShipper';
import DonHang from './DonHang';
import ThongBao from './ThongBao';
import ThongKe from './ThongKe';

const Tab = createBottomTabNavigator();

const Admin = ({ navigation }) => {
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

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ position: 'absolute', top: 20, left: 20, width: '66%' , flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          style={{ flex: 1, height: 35, borderColor: 'gray', borderWidth: 1, marginRight: 10, paddingLeft: 10 }}
          placeholder="Mã Vận đơn ..."
        />
        <TouchableOpacity onPress={() => alert("Chưa nhập nội dung !!!")} style={{ padding: 10, backgroundColor: 'green' }}>
          <Text style={{ fontSize: 16, color: 'blue' }}>Search</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ position: 'absolute', top: 30, right: 20, marginLeft: 5 }} onPress={handleLogin}>
        <Text style={{ fontSize: 16, color: 'blue' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const MainTabAdmin = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Admin') {
          iconName = focused ? 'user' : 'user-o';
          return <FontAwesome name={iconName} size={size} color={color} />;
        } else if (route.name === 'QuanLyShipper') {
          iconName = focused ? 'truck' : 'truck';
          return <FontAwesome name={iconName} size={size} color={color} />;
        } else if (route.name === 'ThongBao') {
            iconName = focused ? 'bell' : 'bell-o';
          return <FontAwesome name={iconName} size={size} color={color} />;
        }  else if (route.name === 'ThongKe') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
        } else if (route.name === 'DonHang') {
          iconName = focused ? 'shopping-cart' : 'shopping-cart';
          return <FontAwesome name={iconName} size={size} color={color} />;
        }
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Admin" component={Admin} />
    <Tab.Screen name="QuanLyShipper" component={QuanLyShipper} />
    <Tab.Screen name="ThongBao" component={ThongBao} />
    <Tab.Screen name="DonHang" component={DonHang} />
    <Tab.Screen name="ThongKe" component={ThongKe} />
  </Tab.Navigator>
);

export default MainTabAdmin;
