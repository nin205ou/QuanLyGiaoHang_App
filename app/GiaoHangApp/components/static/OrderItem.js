import moment from 'moment-timezone';
import { Linking, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import Apis, { authApi, endpoints } from "../../Apis";
import PickerSelect from 'react-native-picker-select';
import { Toast, showToast } from '../../static/js/toast';
import Button from '../static/Button'
import { AuthContext } from '../../context/authContext';

const OrderItem = ({ item , refreshing, fetchData}) => {
    const [statusOrders, setStatusOrders] = React.useState([]);
    const [currentStatus, setCurrentStatus] = React.useState();
    const [isDisabledUpdateBtn, setIsDisabledUpdateBtn] = React.useState(false)
    const formatCollect = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.collection)
    const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.shipper_collect)
    const localTime = moment.utc(item.created_at).tz('Asia/Ho_Chi_Minh').add(6, 'hours');
    const dateCreated = moment(localTime).format('YYYY-MM-DD HH:mm:ss')
    const phoneNumber = item.phone_number_giver;
    const formattedPhoneNumber = phoneNumber.slice(0, 3) + ' ' + phoneNumber.slice(3, 6) + ' ' + phoneNumber.slice(6);

    const { userToken, userInfor } = React.useContext(AuthContext);

    const fetchStatusOrder = async () => {
        try {
            const response = await authApi(userToken).get(endpoints['status_order']);
            setStatusOrders(response.data);
        } catch (error) {
            showToast(error.response.data.message, 'error');
        }
    }

    const handleUpdateSttOrder = async () => {
        if (!currentStatus) {
            showToast('Vui lòng chọn trạng thái mới.', 'error');
            return;
        }
        try {
            await authApi(userToken).put(endpoints['orders'] + item.id + '/update_status/', { status_code: currentStatus });
            showToast('Cập nhật trạng thái đơn hàng thành công.', 'success');
            fetchData()
        } catch (error) {
            showToast(error.response.data.message, 'error');
        }
    };

    React.useEffect(() => {
        fetchStatusOrder();
        if (item.status_id == 4 || item.status_id == -2 || item.status_id == 1) {
            setIsDisabledUpdateBtn(true)
        }
    }, [refreshing])

    return (
        <View style={styles.itemContainer}>
            <Text style={styles.label}>Mã đơn hàng: <Text style={styles.value}>{item.id}</Text></Text>
            <Text style={styles.label}>Tên đơn hàng: <Text style={styles.value}>{item.name_product}</Text></Text>
            <Text style={styles.label}>Trạng thái đơn hàng: <Text style={styles.value}>{item.status_name}</Text></Text>
            <Text style={styles.label}>Thời gian cuối phải giao: <Text style={styles.value}>{dateCreated.toLocaleString()}</Text></Text>
            <Text style={styles.label}>Địa chỉ nhận hàng: <Text style={styles.value}>{item.source}</Text></Text>
            <Text style={styles.label}>Địa chỉ giao hàng: <Text style={styles.value}>{item.destination}</Text></Text>
            <Text style={styles.label}>Số điện thoại người nhận: <Text onPress={() => Linking.openURL(`tel:${phoneNumber}`)} style={{ ...styles.value, color: 'blue' }}>{formattedPhoneNumber}</Text></Text>
            <Text style={styles.label}>Số tiền thu hộ khách hàng: <Text style={styles.value}>{formatCollect}</Text></Text>
            <Text style={styles.label}>Số tiền nhận được cho đơn hàng: <Text style={styles.value}>{formattedPrice}</Text></Text>
            <PickerSelect
                placeholder={{ label: 'Sửa trạng thái', value: null }}
                onValueChange={(value) => setCurrentStatus(value)}
                items={statusOrders.map((status) => ({
                    label: status.name,
                    value: status.code,
                }))}
                style={{ inputAndroid: { width: '100%', backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 } }}
            />
            <Button title="Cập nhật" onPress={handleUpdateSttOrder} disabled={isDisabledUpdateBtn} />
            <Toast />
        </View>
    )
};

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
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