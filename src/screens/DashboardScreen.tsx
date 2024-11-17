import React from 'react';
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
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackNavigatorParams } from '../../App';

const HISTORY_ITEM_SIZE = 62;

type NavigationProps = StackNavigationProp<AppStackNavigatorParams, Routes.DASHBOARD_SCREEN>;

const DashboardScreen = () => {
    const navigation = useNavigation<NavigationProps>();
    const { userInfo } = useUserStore();
    const { transactionHistories } = useHistoryStore();

    const onPressTransfer = () => {
        navigation.navigate(Routes.PAYMENT_SCREEN, {});
    }

    const onPressQuickTransfer = (data: HistoryDateTypes) => {
        navigation.navigate(Routes.PAYMENT_SCREEN, {
            accountNumber: String(data?.accountNumber),
        });

    }

    const renderHistoryItem = ({ item }: { item: HistoryDateTypes }) => {
        return (
            <View style={styles.historyContainer}>
                <View style={{ justifyContent: 'space-between' }}>
                    <Text style={styles.transactionDate}>{moment(item?.date).format("DD MMM YYYY")}</Text>
                    <Text style={styles.transactionListTitle}>{item?.title}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={[styles.transactionAmount, { color: item?.transferType === TransferType.DEBIT ? "red" : "green" }]}>{`${item?.transferType === TransferType.DEBIT ? '- ' : ''} ${amountDisplayFormatter(item?.amount)}`}</Text>

                    <QuickButton icon={require('./../assets/payment.png')} onPress={() => onPressQuickTransfer(item)} />

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
        backgroundColor: "#f0f0f0",
        paddingTop: 12,
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
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
    transactionDate: {
        fontSize: 14
    },
    transactionListTitle: {
        fontWeight: '500', fontSize: 16
    },
    transactionAmount: {
        fontWeight: '500',
        fontSize: 16,
        alignSelf: "flex-end",
    },
    emptyContainer: {
        alignItems: 'center',
        height: 300,
        justifyContent: 'center'
    }

})

export default DashboardScreen;
