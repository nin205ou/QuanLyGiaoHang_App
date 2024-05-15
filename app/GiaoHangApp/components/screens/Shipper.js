import * as React from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { AuthContext } from '../../context/authContext';
import { Toast, showToast } from '../../static/js/toast';
import { Icon } from '@rneui/themed';
import { authApi, endpoints } from '../../Apis';

export default function Shipper({ route }) {
  const { shipperId, action } = route.params;
  const { userToken } = React.useContext(AuthContext);
  const [shipperInfor, setShipperInfor] = React.useState({});
  const [isEditEnabled, setIsEditEnabled] = React.useState(false);

  const fetchShipperInfo = async () => {
      try {
        const response = await authApi(userToken).get(
          `api/users/${shipperId}/`
        );
        setShipperInfor(response.data);
      } catch (error) {
        showToast(error.message, 'error');
      }
  };

  React.useEffect(() => {
    console.log('shipperId', shipperId);
    console.log('action', action);
    fetchShipperInfo();
  }, [userToken, shipperId]);

  const handleSavePress = async () => {
    try {
      const response = await authApi(userToken).put(
        `api/users/${shipperInfor.userId}`,
        shipperInfor
      );
      console.log(response.data);
      setShipperInfor(response.data);
      setIsEditEnabled(false);
      showToast('Information updated successfully!', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const avatarSource = shipperInfor?.avatar
    && { uri: shipperInfor.avatar } 
    // : require('');

  const handleEditPress = () => {
    setIsEditEnabled(!isEditEnabled); // Toggle edit mode
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: 50,
      }}
    >
      <View>
        <SafeAreaView>
          <ScrollView vertical marginHorizontal={20}>
            <View>
              <Image
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: 100,
                }}
                source={avatarSource}
              />
              {isEditEnabled ? (
                <>
                  <View style={{ display: 'flex', marginTop: 36, gap: 20 }}>
                    <Text style={{ fontSize: 20 }}>Name:</Text>
                    <TextInput
                      style={{
                        fontSize: 20,
                        backgroundColor: '#f8fafc',
                        paddingVertical: 12,
                        borderRadius: 10,
                        paddingLeft: 10,
                      }}
                      value={shipperInfor.username}
                      onChangeText={(username) =>
                        setShipperInfor({ ...shipperInfor, username: username })
                      }
                    />
                    <Text style={{ fontSize: 20, color: '#9ca3af' }}>
                      Email:
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        backgroundColor: '#e5e7eb',
                        color: '#9ca3af',
                        paddingVertical: 12,
                        borderRadius: 10,
                        paddingLeft: 10,
                      }}
                    >
                      {shipperInfor.email}
                    </Text>

                    <Text style={{ fontSize: 20, color: '#9ca3af' }}>
                      CCCD:
                    </Text>

                    <Text
                      style={{
                        fontSize: 20,
                        backgroundColor: '#e5e7eb',
                        color: '#9ca3af',
                        paddingVertical: 12,
                        borderRadius: 10,
                        paddingLeft: 10,
                      }}
                    >
                      {shipperInfor.cccd}
                    </Text>

                    <Text style={{ fontSize: 20 }}>Address:</Text>
                    <TextInput
                      style={{
                        fontSize: 20,
                        backgroundColor: '#f8fafc',
                        paddingVertical: 12,
                        borderRadius: 10,
                        paddingLeft: 10,
                      }}
                      value={shipperInfor.address}
                      onChangeText={(address) =>
                        setShipperInfor({ ...shipperInfor, address: address })
                      }
                    />

                    <Text style={{ fontSize: 20 }}>Phone number:</Text>
                    <TextInput
                      style={{
                        fontSize: 20,
                        backgroundColor: '#f8fafc',
                        paddingVertical: 12,
                        borderRadius: 10,
                        paddingLeft: 10,
                      }}
                      value={shipperInfor.phone_number}
                      onChangeText={(phone_number) =>
                        setShipperInfor({
                          ...shipperInfor,
                          phone_number: phone_number,
                        })
                      }
                    />
                  </View>
                </>
              ) : (
                <>
                  <View style={{ display: 'flex', marginTop: 36, gap: 10 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        backgroundColor: '#f8fafc',
                        paddingVertical: 12,
                        borderRadius: 10,
                        paddingLeft: 10,
                      }}
                    >
                      Name: {shipperInfor.username}
                    </Text>
                    
                    <Text
                      style={{
                        fontSize: 20,
                        backgroundColor: '#f8fafc',
                        paddingVertical: 12,
                        borderRadius: 10,
                        paddingLeft: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      
                      Email: {shipperInfor.email}
                    </Text>

                    <Text
                      style={{
                        fontSize: 20,
                        backgroundColor: '#f8fafc',
                        paddingVertical: 12,
                        borderRadius: 10,
                        paddingLeft: 10,
                      }}
                    >
                      CCCD: {shipperInfor.cccd}
                    </Text>

                    <Text
                      style={{
                        fontSize: 20,
                        backgroundColor: '#f8fafc',
                        paddingVertical: 12,
                        borderRadius: 10,
                        paddingLeft: 10,
                      }}
                    >
                      Address: {shipperInfor.address}
                    </Text>

                    <Text
                      style={{
                        fontSize: 20,
                        backgroundColor: '#f8fafc',
                        paddingVertical: 12,
                        borderRadius: 10,
                        paddingLeft: 10,
                      }}
                    >
                      Phone number: {shipperInfor.phone_number}
                    </Text>
                  </View>
                </>
              )}
            </View>
            <TouchableOpacity
              onPress={handleEditPress}
              style={{
                marginTop: 20,
                paddingVertical: 16,
                marginBottom: 20,
                backgroundColor: 'green',
                borderRadius: 10,
                alignItems: 'center',
                marginHorizontal: 20,
              }}
            >
              <Text style={{ fontSize: 16, color: 'white' }}>{isEditEnabled ? 'Save' : 'Edit Profile'}</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
        <Toast />
      </View>
    </View>
  );
}
