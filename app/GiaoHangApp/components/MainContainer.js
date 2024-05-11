import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Home,
  Login,
  Register,
  Admin,
  Shipper,
  User,
  TaoMoiDH,
  Info,
  ThongKe,
  DonHang,
  Auctioning
} from './screens/';

import { AuthProvider, AuthContext } from '../context/authContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const { userInfor } = React.useContext(AuthContext);

  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Infor') {
          iconName = focused ? 'information-circle' : 'information-circle-outline';
        } else if (route.name === 'DonHang') {
          iconName = focused ? 'basket' : 'basket-outline';
        } else if (route.name === 'ThongKe') {
          iconName = focused ? 'stats-chart' : 'stats-chart-outline';
        } else if (route.name === 'Auctioning') {
          return <Icon name='gavel' size={size} color={color} />
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
    {userInfor.role == 1 && <Tab.Screen name="ThongKe" component={ThongKe} />}
    {userInfor.role == 2 && <Tab.Screen name="DonHang" component={DonHang} />}
    {userInfor.role == 3 && <Tab.Screen name="Auctioning" component={Auctioning} />}
    <Tab.Screen name="Infor" component={Info} />
  </Tab.Navigator>
  )
};

export default function MainContainer() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
        <Stack.Screen name="MainTab" component={MainTabNavigator} />
        <Stack.Screen name="MainTabAdmin" component={MainTabAdmin} />
        <Stack.Screen name="MainTabShipper" component={MainTabShipper} />
        <Stack.Screen name="MainTabUser" component={MainTabUser} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="TaoMoiDH" component={TaoMoiDH} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="Shipper" component={Shipper} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="QuanLyShipper" component={QuanLyShipper} />
       <Stack.Screen name="ThongBao" component={ThongBao} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
