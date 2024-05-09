import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

export default function QuanLyShipper({ navigation }) {
  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'flex-end',marginRight: 20, }}>
        <TouchableOpacity onPress={handleRegister} style={{ marginRight: 10, padding: 10, backgroundColor: 'green', borderRadius: 5 }}>
          <Text style={{ fontSize: 16, color: 'white' }}>Thêm</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tableContainer}>
        <View style={styles.row}>
          <Text style={[styles.header, styles.cell]}>Mã Shipper</Text>
          <Text style={[styles.header, styles.cell]}>Họ và Tên</Text>
          <Text style={[styles.header, styles.cell]}>Số điện thoại</Text>
          <Text style={[styles.header, styles.cell]}>Số CCCD</Text>
          </View>
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
