import React from 'react';
import moment from 'moment-timezone';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { showToast, Toast } from '../../static/js/toast';
import { AuthContext } from '../../context/authContext';
import Apis, { authApi, endpoints } from "../../Apis";
import PickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';

export default function QuanLyShipper() {
  const [tableData, setTableData] = React.useState([]);
  const tableHead = ['STT', 'Name', 'Email', 'CCCD', 'Create At', 'Actions']
  const [isWaitingAccept, setIsWaitingAccept] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation();

  const { userToken, userInfor } = React.useContext(AuthContext);

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleRefresh = () => {
    setRefreshing(prev => !prev)
  }

  const fetchShipperList = async () => {
    try {
      const shippers = await authApi(userToken).get(endpoints['shippers'] + '?is_waiting_accept=' + isWaitingAccept);
      const tableData = shippers.data.map((shipper, index) => {
        let timeAt = moment.utc(shipper.created_at).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
        return [index + 1, shipper.username, shipper.email, shipper.cccd, timeAt, shipper.id]
      });
      setTableData(tableData);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleAcceptShipper = async (data) => {
    try {
      const response = await authApi(userToken).put(endpoints['users'] + 'response_shipper/',
        {
          shipper_id: data.shipperId,
          is_accept: true
        }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      showToast(response.data.message, 'success');
      setRefreshing(prev => !prev);
    } catch (error) {
      showToast(error.response.message, 'error');
    }
  }

  const handleRejectShipper = async (data) => {
    try {
      const response = await authApi(userToken).put(endpoints['users'] + 'response_shipper/',
        {
          shipper_id: data.shipperId,
          is_accept: false
        }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      showToast(response.data.message, 'success');
      setRefreshing(prev => !prev);
    } catch (error) {
      showToast(error.response.message, 'error');
    }
  }

  const handleDeleteShipper = async (data) => {
    try {
      const response = await authApi(userToken).delete(endpoints['users'] + data.shipperId + '/');
      if (response.status === 204) {
        showToast('Xóa shipper thành công', 'success');
        setRefreshing(prev => !prev);
      } else {
        showToast('Đã xảy ra lỗi khi xóa shipper', 'error');
      }
    } catch (error) {
      showToast(error.message, 'error');
    }
  }

  const element = (data, index) => {
    return isWaitingAccept ? (
      <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={async () => {
          Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn chấp nhận shipper này không?',
            [
              {
                text: 'Hủy',
                style: 'cancel',
              },
              {
                text: 'Đồng ý',
                onPress: async () => await handleAcceptShipper(data),
              },
            ],
          );

        }}
        >
          <View style={{ ...styles.btn, backgroundColor: '#59B259' }}>
            <Text style={styles.btnText}>Đồng ý</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 3 }} onPress={async () => {
          Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn từ chối shipper này không?',
            [
              {
                text: 'Hủy',
                style: 'cancel',
              },
              {
                text: 'Từ chối',
                onPress: async () => await handleRejectShipper(data),
              },
            ],
          );

        }}
        >
          <View style={{ ...styles.btn, backgroundColor: '#FB3E5A' }}>
            <Text style={styles.btnText}>Từ chối</Text>
          </View>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={async () => {
          navigation.navigate('Shipper', { shipperId: data.shipperId, action: 'edit' });
        }}
        >
          <View style={{ ...styles.btn, backgroundColor: '#EBA35D' }}>
            <Text style={styles.btnText}>Sửa</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 3 }} onPress={async () => {
          Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn muốn xóa shipper này không?',
            [
              {
                text: 'Hủy',
                style: 'cancel',
              },
              {
                text: 'Xóa',
                onPress: async () => await handleDeleteShipper(data),
              },
            ],
          );

        }}
        >
          <View style={{ ...styles.btn, backgroundColor: '#F14356' }}>
            <Text style={styles.btnText}>
              Xóa
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  };

  React.useEffect(() => {
    fetchShipperList();
  }, [userToken, isWaitingAccept, refreshing]);

  return (
    <View style={{ flex: 1 }} >
      {
        userInfor.role == 1 ? (
          <ScrollView style={{ flex: 1 }} refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={handleRefresh}
            />

          }>
            <View style={styles.container}>
              <PickerSelect
                placeholder={{ label: 'Đang hoạt động', value: 0 }}
                onValueChange={(value) => setIsWaitingAccept(value)}
                items={[
                  { label: 'Chờ duyệt', value: 1 },
                ]}
                style={{ inputAndroid: { width: '100%', backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 } }}
              />
              <Text style={{ backgroundColor: 'green', marginTop: 2, borderRadius: 8, paddingVertical: 12, color: 'white', paddingLeft: 12 }}>Shippers</Text>
              <View style={styles.containerTable}>
                {
                  tableData.length == 0 ? <Text style={{ textAlign: 'center', marginTop: 10 }}>Chưa có shipper nào trong danh sách</Text> :
                    (
                      <Table borderStyle={{ borderColor: 'transparent' }}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                        {
                          tableData.map((rowData, index) => (
                            <TableWrapper key={index} style={styles.row}>
                              {
                                rowData.map((cellData, cellIndex) => {
                                  return <Cell key={cellIndex} data={cellIndex == 5 ? element({ "shipperId": cellData }, cellIndex) : cellData} textStyle={styles.text} />
                                })
                              }
                            </TableWrapper>
                          ))
                        }
                      </Table>
                    )
                }
              </View>
            </View>
          </ScrollView>
        ) : <Text style={styles.text} > Chỉ có Administration mới có thể xem được danh sách Shipper</Text>
      }
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    marginBottom: 10
  },
  tableContainer: {
    margin: 20,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#ccc',
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
  containerTable: { flex: 1, marginTop: 8, marginBottom: 20 },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6, fontSize: 10 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff', fontSize: 12 }
});
