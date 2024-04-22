import * as React from 'react';
import { View, Text } from 'react-native';
import{NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';



import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import Info from './screens/Info';
import ThongKe from './screens/ThongKe';
import DonHang from './screens/DonHang';


const homeName ='Home';
const infoName ='Info';
const donHangName='DonHang';
const thongKeName='ThongKe';

const Stack = createStackNavigator();
const Tab=createBottomTabNavigator();

export default function MainContainer(){
    return(
        <NavigationContainer>
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
            labelStyle: {paddingBottom:10,fontSize: 10},
            style: {padding: 10, height :70 }
          }}

        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Register" component={Register} />
          <Tab.Screen name="Info" component={Info} />
          <Tab.Screen name="DonHang" component={DonHang} />
          <Tab.Screen name="ThongKe" component={ThongKe} />
        </Tab.Navigator>
        
      </NavigationContainer>
    );
}