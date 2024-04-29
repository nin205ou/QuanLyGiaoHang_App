import * as React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function DonHang({ navigation }) {
 
  const handleTaoMoiDH = () => {
    navigation.navigate('TaoMoiDH');
  };

  const data = [
    {
      id: 1,
      maDonHang: 'DH001',
      ngayTao: '01/04/2024',
      thongTinGui: 'Người gửi 1 - Địa chỉ 1',
      thongTinNhan: 'Người nhận 1 - Địa chỉ 2',
      trangThai: 'Đang xử lý',
      shipper: 'Shipper 1',
    },
    {
      id: 2,
      maDonHang: 'DH002',
      ngayTao: '02/04/2024',
      thongTinGui: 'Người gửi 2 - Địa chỉ 3',
      thongTinNhan: 'Người nhận 2 - Địa chỉ 4',
      trangThai: 'Đã giao',
      shipper: 'Shipper 2',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>Mã đơn hàng: {item.maDonHang}</Text>
      <Text>Ngày tạo: {item.ngayTao}</Text>
      <Text>Thông tin gửi: {item.thongTinGui}</Text>
      <Text>Thông tin nhận: {item.thongTinNhan}</Text>
      <Text>Trạng thái: {item.trangThai}</Text>
      <Text>Shipper: {item.shipper}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={{ paddingHorizontal: 10 }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
        <TouchableOpacity onPress={handleTaoMoiDH} style={{ marginRight: 10, padding: 10, backgroundColor: 'green', borderRadius: 5 }}>
          <Text style={styles.buttonText}>Tạo mới</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Xóa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sửa</Text>
        </TouchableOpacity>
      </View>
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
  },
});
