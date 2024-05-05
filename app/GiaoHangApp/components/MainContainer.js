import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
// import Admin from './screens/Admin/Admin';
// import DoanhThu from './screens/Admin/DoanhThu';
// import QuanLyShipper from './screens/Admin/QLShipper';
// import TrangThaiDonHang from './screens/Admin/TrangThaiDon';
import TaoMoiDH from './screens/TaoMoiDH';
import Info from './screens/Info';
import ThongKe from './screens/ThongKe';
import DonHang from './screens/DonHang';
import { AuthProvider } from '../context/authContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Info') {
          iconName = focused ? 'information-circle' : 'information-circle-outline';
        } else if (route.name === 'DonHang') {
          iconName = focused ? 'basket' : 'basket-outline';
        } else if (route.name === 'ThongKe') {
          iconName = focused ? 'stats-chart' : 'stats-chart-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      labelStyle: { paddingBottom: 10, fontSize: 10 },
      style: { padding: 10, height: 70 }
    }}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Info" component={Info} />
    <Tab.Screen name="DonHang" component={DonHang} />
    <Tab.Screen name="ThongKe" component={ThongKe} />
  </Tab.Navigator>
);

export default function MainContainer() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="MainTab" component={MainTabNavigator} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="TaoMoiDH" component={TaoMoiDH} />
          {/* <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="DoanhThu" component={DoanhThu} />
        <Stack.Screen name="QuanLyShipper" component={QuanLyShipper} />|
       <Stack.Screen name="TrangThaiDonHang" component={TrangThaiDonHang} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
