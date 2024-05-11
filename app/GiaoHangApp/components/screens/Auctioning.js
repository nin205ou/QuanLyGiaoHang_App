import * as React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, RefreshControl } from 'react-native';
import Apis, { authApi, endpoints } from "../../Apis";
import { AuthContext } from '../../context/authContext';
import { Toast, showToast } from '../../static/js/toast';
import Auction from '../static/AuctionItem';

export default function Auctioning({ navigation }) {
  const [data, setData] = React.useState([]);
  const [alert, setAlert] = React.useState('Không có buổi đấu giá nào đang diễn ra');
  const [refreshing, setRefreshing] = React.useState(false);
  const { userToken, userInfor } = React.useContext(AuthContext)

  const handleTaoMoiDH = () => {
    navigation.navigate('TaoMoiDH');
  };

  const fetchData = async () => {
    try {
      if (!userToken || !userInfor) {
        setData([]);
        setAlert('Vui lòng đăng nhập để xem các buối đấu giá đang diễn ra');
        showToast(alert, 'error');
      } else {
        authApi(userToken).get(endpoints['auctions'] + '?isAuctioning=True')
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
            renderItem={({ item }) => <Auction item={item} />}
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
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, justifyContent: 'flex-end' }}>
        <TouchableOpacity onPress={handleTaoMoiDH} style={{ marginBottom: 10, marginRight: 10, padding: 10, backgroundColor: 'green', borderRadius: 50 }}>
          <Text style={styles.buttonText}>Tạo đơn</Text>
        </TouchableOpacity>
      </View> */}
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  }
});