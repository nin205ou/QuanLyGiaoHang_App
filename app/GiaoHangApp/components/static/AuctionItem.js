import moment from 'moment-timezone';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as React from 'react';

const Auction = ({ item }) => {
    const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.current_price)
    const localTime = moment.utc(item.created_at).tz('Asia/Ho_Chi_Minh');
    const dateCreated = moment(localTime).format('YYYY-MM-DD HH:mm:ss');
    const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const endTime = moment(item.end_time);
        const now = moment();
        const diff = endTime.diff(now);
        const duration = moment.duration(diff);
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        return {
            hours,
            minutes,
            seconds
        }
    }

    item.status && React.useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <View style={styles.itemContainer}>
            <Text style={styles.label}>Tên đơn hàng: <Text style={styles.value}>{item.name}</Text></Text>
            <Text style={styles.label}>Người tạo: <Text style={styles.value}>{item.user}</Text></Text>
            <Text style={styles.label}>Trạng thái:<Text style={[styles.value, { color: 'green' }]}> Đang diễn ra </Text></Text>
            <Text style={styles.label}>Thời gian còn lại:
                <Text style={styles.value}>
                    {` ${timeLeft.hours} giờ ${timeLeft.minutes} phút ${timeLeft.seconds} giây`}
                </Text>
            </Text>
            <Text style={styles.label}>Điểm nhận hàng: <Text style={styles.value}>{item.source}</Text></Text>
            <Text style={styles.label}>Điểm giao hàng: <Text style={styles.value}>{item.destination}</Text></Text>
            <Text style={styles.label}>Số tiền đấu giá hiện tại: <Text style={styles.value}>{formattedPrice}</Text></Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={() => alert('khoe khong')} style={{ marginTop: 12, paddingHorizontal: 20, paddingVertical: 8, backgroundColor: 'green', borderRadius: 8 }}>
                    <Text style={{ fontSize: 14, color: 'white' }}>Xem chi tiết</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    itemContainer: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    value: {
        fontSize: 13,
        fontWeight: 'normal',
        marginBottom: 5,
    },
});

export default Auction;