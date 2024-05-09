import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function DonHang({ navigation }) {
  const [data, setData] = useState([
    {
      maDonHang: 'DH001',
      ngayTao: '01/04/2024',
      thongTinGui: 'Người gửi 1 - Địa chỉ 1',
      thongTinNhan: 'Người nhận 1 - Địa chỉ 2',
      trangThai: 'Đang xử lý',
      shipper: 'SH003',
    },
    {
      maDonHang: 'DH002',
      ngayTao: '02/04/2024',
      thongTinGui: 'Người gửi 2 - Địa chỉ 3',
      thongTinNhan: 'Người nhận 2 - Địa chỉ 4',
      trangThai: 'Đang xử lý',
      shipper: 'SH001',
    },
  ]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const handleTaoMoiDH = () => {
    navigation.navigate('TaoMoiDH');
  };

  const handleHoanThanhDH = () => {
    if (selectedItemIndex !== null) {
      const newData = data.map((item, index) => {
        if (index === selectedItemIndex) {
          return { ...item, trangThai: 'Đã giao' };
        }
        return item;
      });
      setData(newData);
    }
  };

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleItemClick(index)}>
      <View style={[styles.row, selectedItemIndex === index && styles.selectedRow]}>
        <Text style={styles.cell}>{index + 1}</Text>
        <Text style={styles.cell}>{item.maDonHang}</Text>
        <Text style={styles.cell}>{item.shipper}</Text>
        <Text style={styles.cell}>{item.trangThai}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
        <TouchableOpacity onPress={handleTaoMoiDH} style={{ marginRight: 10, padding: 10, backgroundColor: 'green', borderRadius: 5 }}>
          <Text style={{ fontSize: 16, color: 'white' }}>Tạo mới</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHoanThanhDH} style={{ marginRight: 10, padding: 10, backgroundColor: 'green', borderRadius: 5 }}>
          <Text style={{ fontSize: 16, color: 'white' }}>Hoàn Thành</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tableContainer}>
        <View style={styles.row}>
          <Text style={[styles.header, styles.cell]}>STT</Text>
          <Text style={[styles.header, styles.cell]}>MÃ ĐƠN HÀNG</Text>
          <Text style={[styles.header, styles.cell]}>MÃ SHIPPER</Text>
          <Text style={[styles.header, styles.cell]}>TRẠNG THÁI ĐƠN</Text>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
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
