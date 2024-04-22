import * as React from 'react';
import { View,Text } from 'react-native';


export default function Info({navigation}){
  return(
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text
         onPress={()=>navigation.navigation('Home')}
         style={{fontSize:26,fontWeight:'bold'}}>Info</Text>
    </View>
  );
}