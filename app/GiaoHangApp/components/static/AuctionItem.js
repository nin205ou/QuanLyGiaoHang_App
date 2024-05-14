import moment from 'moment-timezone';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/authContext';

const Auction = ({ item }) => {
    const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.current_price)
    const localTime = moment.utc(item.end_time).tz('Asia/Ho_Chi_Minh');
    const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());
    const dateCreated = moment(localTime).format('YYYY-MM-DD HH:mm:ss');
    const navigation = useNavigation();
    const { userInfor } = React.useContext(AuthContext);

    function calculateTimeLeft() {
        const endTime = moment(localTime);
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

    const handleAuctionDetail = (id) => {
        let payload = { auctionId: id };
        if (userInfor.role === 3) {
            navigation.navigate('AuctionShipper', payload);
        } else {
            navigation.navigate('AuctionCustomer', payload);
        }
    }

    return (
        <View style={styles.itemContainer}>
            <Text style={styles.label}>Tên đơn hàng: <Text style={styles.value}>{item.name}</Text></Text>
            <Text style={styles.label}>Người tạo: <Text style={styles.value}>{item.user_name}</Text></Text>
            <Text style={styles.label}>Trạng thái:
                <Text style={[styles.value, { color: item.status ? 'green' : 'red' }]}>
                    {item.status ? ' Đang diễn ra' : ' Đã kết thúc'}
                </Text>
            </Text>

            {
                item.status ? (
                    <Text style={styles.label}>Thời gian còn lại:
                        <Text style={styles.value}>
                            {` ${timeLeft.hours} giờ ${timeLeft.minutes} phút ${timeLeft.seconds} giây`}
                        </Text>
                    </Text>
                ) : null
            }
            {
                userInfor.role == 3 ? (
                    <>
                        <Text style={styles.label}>Điểm nhận hàng: <Text style={styles.value}>{item.source}</Text></Text>
                        <Text style={styles.label}>Điểm giao hàng: <Text style={styles.value}>{item.destination}</Text></Text>
                    </>
                ) : null
            }
            {userInfor.role == 2 ? <Text style={styles.label}>Thời gian tạo: <Text style={styles.value}>{dateCreated.toLocaleString()}</Text></Text> : null}
            <Text style={styles.label}>{item.status ? 'Số tiền đấu giá hiện tại' : 'Số tiền cuối cùng'}: <Text style={styles.value}>{formattedPrice}</Text></Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={() => handleAuctionDetail(item.id)} style={{ marginTop: 12, paddingHorizontal: 20, paddingVertical: 8, backgroundColor: 'green', borderRadius: 8 }}>
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
        paddingHorizontal: 10,
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