import * as React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, RefreshControl } from 'react-native';
import Apis, { authApi, endpoints } from "../../Apis";
import { AuthContext } from '../../context/authContext';
import { Toast, showToast } from '../../static/js/toast';
import OrderItem from '../static/OrderItem';

export default function OrderShipper({ navigation }) {
  const [data, setData] = React.useState([]);
  const [alert, setAlert] = React.useState('Bạn chưa nhận đơn hàng nào');
  const [refreshing, setRefreshing] = React.useState(false);
  const { userToken, userInfor } = React.useContext(AuthContext)

  const handleTaoMoiDH = () => {
    navigation.navigate('Auctioning');
  };

  const fetchData = async () => {
    try {
      if (!userToken || !userInfor) {
        setData([]);
        setAlert('Vui lòng đăng nhập để xem đơn hàng của bạn');
        showToast(alert, 'error');
      } else {
        authApi(userToken).get(endpoints['orders'] + '?shipper_id=' + userInfor.userId)
          .then(response => {
            setData(response.data);
          })
      }
    } catch (error) {
      setData([]);
      showToast(error.message, 'error');
    }
  };

  const handleRefresh = () => {
    setRefreshing(prev => !prev)
  }

  React.useEffect(() => {
    fetchData();
  }, [userToken, userInfor, refreshing])

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      {
        data.length > 0 ? (
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <OrderItem item={item} />}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={handleRefresh}
              />
            }
          />
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{alert}</Text>
          </View>
        )

      }
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, justifyContent: 'flex-end' }}>
        <TouchableOpacity onPress={handleTaoMoiDH} style={{ marginBottom: 10, marginRight: 10, padding: 10, backgroundColor: 'green', borderRadius: 50 }}>
          <Text style={styles.buttonText}>Đấu giá đang diễn ra</Text>
        </TouchableOpacity>
      </View>
      <Toast />

    </View>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    margin: 20,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#ccc',
  },
  selectedRow: {
    backgroundColor: 'lightblue',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    paddingVertical: 10,
    borderRightWidth: 2,
    borderColor: '#ccc',
    textAlign: 'center',
  },
});
