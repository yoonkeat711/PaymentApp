import React, { useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import AmountCard from '../components/AmountCard';
import QuickButton from '../components/QuickButton';
import { useNavigation } from '@react-navigation/native';
import Routes from '../navigation/routes';
import { FlashList } from '@shopify/flash-list';
import { HistoryDateTypes, TransferType } from '../constants/types';
import { amountDisplayFormatter } from '../utils/number';
import useUserStore from '../stores/userStores';
import useHistoryStore from '../stores/historyStores';
import moment from 'moment';

const HISTORY_ITEM_SIZE = 62;

const DashboardScreen = () => {
    const navigation = useNavigation();
    const { setUserInfo, userInfo } = useUserStore();
    const { transactionHistories } = useHistoryStore();

    useEffect(() => {
        setUserInfo({ name: "Keat", accountBalance: 2233, accountNumber: "111122223333" })
    }, []);

    const onPressTransfer = () => {
        navigation.navigate(Routes.PAYMENT_SCREEN, {});
    }

    const renderHistoryItem = ({ item }: { item: HistoryDateTypes }) => {
        return (
            <View style={styles.historyContainer}>
                <Text style={styles.transactionDate}>{moment(item?.date).format("DD MMM YYYY")}</Text>
                <View style={styles.transactionDetail}>
                    <Text style={styles.transactionListTitle}>{item?.title}</Text>
                    <Text style={[styles.transactionAmount, { color: item?.transferType === TransferType.DEBIT ? "red" : "green" }]}>{`${item?.transferType === TransferType.DEBIT ? '- ' : ''} ${amountDisplayFormatter(item?.amount)}`}</Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>{`Yo, ${userInfo?.name}`}</Text>

                <AmountCard amount={userInfo?.accountBalance} accountNumber={userInfo?.accountNumber} />
                <View style={styles.quickButtonContainer}>
                    <QuickButton icon={require('./../assets/payment.png')} text='Transfer' onPress={onPressTransfer} />
                </View>
            </View>
            <Text style={styles.transactionTitle}>Transaction History</Text>

            <FlashList
                data={transactionHistories}
                ListEmptyComponent={<View style={styles.emptyContainer}><Text>No result found.</Text></View>}
                renderItem={renderHistoryItem}
                // style={styles.list}
                estimatedItemSize={HISTORY_ITEM_SIZE}
                contentContainerStyle={styles.listContentContainer}
            />

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    container: {
        paddingHorizontal: 24,
        paddingTop: 24,
    },
    title: {
        fontSize: 30,
        fontWeight: '500'
    },
    historyContainer: {
        paddingTop: 12,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        paddingBottom: 8
    },
    quickButtonContainer: {
        alignItems: 'center'
    },
    transactionTitle: {
        fontSize: 20,
        fontWeight: '500',
        paddingTop: 20,
        paddingHorizontal: 24
    },
    listContentContainer: {
        paddingHorizontal: 24,
        paddingBottom: 24
    },
    list: {
        flex: 1
    },
    transactionDate: {
        fontSize: 14
    },
    transactionListTitle: {
        fontWeight: '500', fontSize: 16
    },
    transactionDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 4
    },
    transactionAmount: {
        fontWeight: '500',
        fontSize: 16,
    },
    emptyContainer: {
        alignItems: 'center',
        height: 300,
        justifyContent: 'center'
    }

})

export default DashboardScreen;
