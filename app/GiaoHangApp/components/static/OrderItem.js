import moment from 'moment-timezone';
import { StyleSheet,Text, TouchableOpacity, View } from 'react-native';
import * as React from 'react';

const OrderItem = ({ item }) => {
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
            <Text style={styles.label}>Mã đơn hàng: <Text style={styles.value}>{item.id}</Text></Text>
            <Text style={styles.label}>Tên đơn hàng: <Text style={styles.value}>{item.name}</Text></Text>
            <Text style={styles.label}>Người tạo: <Text style={styles.value}>{item.user_name}</Text></Text>
            <Text style={styles.label}>Trạng thái:
                <Text style={[styles.value, { color: item.status ? 'green' : 'red' }]}>
                    {item.status ? ' Đang diễn ra' : ' Đã kết thúc'}
                </Text></Text>
            {
                item.status ? (
                    <Text style={styles.label}>Thời gian còn lại: 
                        <Text style={styles.value}>
                            {` ${timeLeft.hours} giờ ${timeLeft.minutes} phút ${timeLeft.seconds} giây`}
                        </Text>
                    </Text>
                ) : null
            }
            <Text style={styles.label}>Thời gian tạo: <Text style={styles.value}>{dateCreated.toLocaleString()}</Text></Text>
            <Text style={styles.label}>{item.status ? 'Số tiền hiện tại' : 'Số tiền đã trả'}: <Text style={styles.value}>{formattedPrice}</Text></Text>
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
        paddingHorizontal: 10
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    value: {
        fontSize: 16,
        fontWeight: 'normal',
        marginBottom: 5,
    },
});

export default OrderItem;