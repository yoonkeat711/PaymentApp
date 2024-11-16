import React from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import AmountCard from '../components/AmountCard';
import QuickButton from '../components/QuickButton';
import { useNavigation } from '@react-navigation/native';
import Routes from '../navigation/routes';
import { FlashList } from '@shopify/flash-list';
import { HistoryDateTypes, TransferType } from '../constants/types';
import { amountDisplayFormatter } from '../utils/amount';
// import { TransferType } from '../constants/types';

const DashboardScreen = () => {
    const navigation = useNavigation();

    const onPressTransfer = () => {
        navigation.navigate(Routes.PAYMENT_SCREEN, {});
    }

    const mockHistoryData: HistoryDateTypes[] = [
        {
            date: "16 Nov 2022",
            title: "Transfer 1",
            amount: 200,
            transferType: TransferType.CREDIT,
        },
        {
            date: "14 Nov 2022",
            title: "Transfer 2",
            amount: 400,
            transferType: TransferType.DEBIT,
        },
        {
            date: "14 Nov 2022",
            title: "Transfer 2",
            amount: 400,
            transferType: TransferType.DEBIT,
        },
        {
            date: "14 Nov 2022",
            title: "Transfer 2",
            amount: 400,
            transferType: TransferType.DEBIT,
        },
    ];

    const renderHistoryItem = ({ item }: { item: HistoryDateTypes }) => {
        return (
            <View style={styles.historyContainer}>
                <Text style={styles.transactionDate}>{item?.date}</Text>
                <View style={styles.transactionDetail}>
                    <Text style={styles.transactionListTitle}>{item?.title}</Text>
                    <Text style={[styles.transactionAmount ,{color: item?.transferType === TransferType.DEBIT ? "red" : "green" }]}>{amountDisplayFormatter(item?.amount)}</Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>{"Yo, Keat"}</Text>

                <AmountCard amount={20004} accountNumber='1122 3333 4444' />
                <View style={styles.quickButtonContainer}>
                    <QuickButton icon={require('./../assets/payment.png')} text='Transfer' onPress={onPressTransfer} />
                </View>
            </View>
            <Text style={styles.transactionTitle}>Transaction History</Text>

            <FlashList
                data={mockHistoryData}
                renderItem={renderHistoryItem}
                style={styles.list}
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
    }

})

export default DashboardScreen;
