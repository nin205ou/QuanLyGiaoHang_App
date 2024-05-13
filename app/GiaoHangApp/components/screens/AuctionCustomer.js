import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import moment from 'moment-timezone';
import { RefreshControl, StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import Button from '../static/Button';
import { AuthContext } from '../../context/authContext';
import Apis, { authApi, endpoints } from "../../Apis";
// import {  } from 'react-native-gesture-handler';
import { showToast, Toast } from '../../static/js/toast';

export default function AuctionCustomer({ route }) {
    const { auctionId } = route.params;
    const [auction, setAuction] = React.useState({});
    const { userToken } = React.useContext(AuthContext);
    const navigation = useNavigation();
    const [formattedPriceStart, setFormattedPriceStart] = React.useState('');
    const [formattedPriceCurrent, setFormattedPriceCurrent] = React.useState('');
    const localTime = moment.utc(auction.end_time).tz('Asia/Ho_Chi_Minh');
    const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());
    const tableHead = ['STT', 'Name', 'Price', 'Time_at', 'Actions']
    const [tableData, setTableData] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    const fetchAuction = async () => {
        try {
            const auctionInfor = (await authApi(userToken).get(endpoints['auctions'] + auctionId)).data;
            setAuction(auctionInfor);
            setFormattedPriceStart(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(auctionInfor.start_price));
            setFormattedPriceCurrent(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(auctionInfor.current_price));
            const shippers = (await Apis.get(endpoints['bids'] + '?auctionId=' + auctionId)).data;
            const tableData = shippers.map((shipper, index) => {
                let timeAt = moment.utc(shipper.created_at).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
                let price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(shipper.price);
                return [index + 1, shipper.shipper_name, price, timeAt, shipper.shipper]
            });
            setTableData(tableData);
        } catch (error) {
            console.log(error.message);
        }
    }

    React.useEffect(() => {
        fetchAuction();
    }, [refreshing]);

    const handleRefresh = () => {
        setRefreshing(prev => !prev)
    }

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

    React.useEffect(() => {
        if (auction.status) {
            const timer = setInterval(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [auction.status]);

    const handleSelectWinner = async (data) => {
        try {
            const res = await authApi(userToken).post(endpoints['auctions'] + auctionId + '/select_winner_shipper/', {
                shipper_id: data.shipperId,
                price: parseInt(data.price.replace(/[^\d]/g, ''))
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.status === 200) {
                showToast('Chọn shipper thành công', 'success');
                fetchAuction();
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const element = (data, index) => (
        <TouchableOpacity onPress={async () => {
            Alert.alert(
                'Xác nhận',
                'Bạn có chắc chắn chọn shipper này không?',
                [
                    {
                        text: 'Hủy',
                        style: 'cancel',
                    },
                    {
                        text: 'Chọn',
                        onPress: async () => await handleSelectWinner(data),
                    },
                ],
            );

        }}
            disabled={auction.winner_shipper !== null}
        >
            <View style={[styles.btn, { opacity: auction.winner_shipper !== null ? 0.5 : 1 }]}>
                <Text style={styles.btnText}>Chọn</Text>
            </View>
        </TouchableOpacity>
    );

    const handleCancel = async () => {
        try {
            const res = await authApi(userToken).delete(endpoints['auctions'] + '/' + auctionId);
            if (res.status === 200) {
                showToast('Hủy đấu giá thành công', 'success');
                navigation.goBack();
            }
        } catch (error) {
            let errorMessage = error.response.data.message || error.response.data.error || error.response.data.error_description || error.response.data.detail;
            showToast(errorMessage, 'error');
            fetchAuction();
        }
    }

    return (
        <View style={{flex: 1}} >
        <ScrollView style={{ flex: 1 }} refreshControl={
            <RefreshControl
                refreshing={false}
                onRefresh={handleRefresh}
            />

        }>
            <Text style={styles.exprired}>Thời gian còn lại: {` ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}</Text>
            <View style={styles.container}>
                <View style={styles.listItem}>
                    <Text style={styles.item}>Tên đơn hàng: <Text style={styles.value}>{auction.name}</Text></Text>
                    <Text style={styles.item}>Người tạo: <Text style={styles.value}>{auction.user_name}</Text></Text>
                    <Text style={styles.item}>From
                        <Text style={{ color: 'green', ...styles.value }}>{`  ${auction.source}   `}</Text>
                        To
                        <Text style={{ color: 'green', ...styles.value }}>{`  ${auction.destination}`}</Text>
                    </Text>
                    <Text style={styles.item}>Số shipper tham gia: <Text style={styles.value}>{auction.shipper_joining}</Text></Text>
                    <Text style={styles.item}>Id shipper giành chiến thắng: <Text style={styles.value}>{auction.winner_shipper ? auction.winner_shipper : "Chưa có"}</Text></Text>
                    <Text style={styles.item}>Số tiền đấu giá ban đầu: <Text style={styles.value}>{formattedPriceStart}</Text></Text>
                    <Text style={styles.item}>Số tiền đấu giá hiện tại: <Text style={{ color: 'red', ...styles.value }}>{formattedPriceCurrent}</Text></Text>

                </View>
                <Text style={{ backgroundColor: 'green', ...styles.exprired, marginTop: 15, borderRadius: 8 }}>Shippers</Text>
                <View style={styles.containerTable}>
                    {
                        tableData.length == 0 ? <Text style={{ textAlign: 'center', marginTop: 10 }}>Không có shipper nào tham gia</Text> :
                            (
                                <Table borderStyle={{ borderColor: 'transparent' }}>
                                    <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                                    {
                                        tableData.map((rowData, index) => (
                                            <TableWrapper key={index} style={styles.row}>
                                                {
                                                    rowData.map((cellData, cellIndex) => {
                                                        return <Cell key={cellIndex} data={cellIndex == 4 ? element({"shipperId": cellData, "price": rowData[2]}, cellIndex) : cellData} textStyle={styles.text} />
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
        <View style={{ marginBottom: 10, paddingHorizontal: 15 }}>
                <Button title="Hủy đấu giá" onPress={handleCancel} disabled={auction.winner_shipper !== null} />
        </View>
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
    listItem: {
        borderColor: '#bbb',
        borderRadius: 5,
        borderWidth: 1,
        borderStyle: 'solid',
        marginBottom: 10,
        marginTop: 15,
        paddingTop: 3,
    },
    item: {
        paddingVertical: 12,
        paddingLeft: 4,
        width: '92%',
        borderBottomWidth: 1,
        borderBottomColor: '#bbb',
        borderStyle: 'dashed',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 'auto'
    },
    exprired: {
        marginTop: 30,
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: 'green',
        width: '80%'
    },
    value: {
        fontSize: 14,
        fontWeight: 'normal',
        display: 'flex',
        marginHorizontal: 10
    },
    containerTable: { flex: 1, marginTop: 8, marginBottom: 20 },
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 6, fontSize: 10 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff', fontSize: 12 }
});