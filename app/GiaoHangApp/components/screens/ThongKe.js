import React from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function ThongKe({ navigation }) {
//DB SL ĐƠN HÀNG    
const donHangData = {
    labels: ['TUẦN 1', 'TUẦN 2', 'TUẦN 3', 'TUẦN 4'],
    datasets: [
      {
        data: [20, 45, 28, 80], // VÍ DỤ 
      },
    ],
  };

  // DB DOANH THU 
  const doanhThuData = {
    labels: ['TUẦN 1', 'TUẦN 2', 'TUẦN 3', 'TUẦN 4'],
    datasets: [
      {
        data: [1000, 1500, 1200, 2000], // VÍ DỤ 
      },
    ],
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row-reverse', marginTop: 10, marginRight: 250 , padding: 10}}>
        <TouchableOpacity style={{ padding: 10, backgroundColor: 'green', borderRadius: 5 }}>
          <Text style={{ fontSize: 16, color: 'white' }}>Làm mới </Text>
        </TouchableOpacity>
      </View>
      <BarChart
        data={donHangData}
        width={300}
        height={200}
        yAxisLabel={'#'}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={{ marginVertical: 8 }}
      />
      <Text style={{ fontSize: 20, marginBottom: 10 }}>THỐNG KÊ SỐ LƯỢNG ĐƠN HÀNG</Text>
      <BarChart
        data={doanhThuData}
        width={300}
        height={200}
        yAxisLabel={'$'}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={{ marginVertical: 8 }}
      />
      <Text style={{ fontSize: 20, marginBottom: 10 }}>THỐNG KÊ DOANH THU </Text>
    </View>
  );
}
