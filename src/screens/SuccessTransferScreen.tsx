import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { SuccessTransferScreenProps } from '../../App';
import moment from 'moment';
import CTAButton from '../components/CTAButton';
import Routes from '../navigation/routes';
import { amountDisplayFormatter } from '../utils/number';

export type SuccessTransferScreenParams = {
    accountNumber: string;
    date: Date;
    amount: string;
};

const SuccessTransferScreen = ({ route, navigation }: SuccessTransferScreenProps) => {
    const { amount, date, accountNumber } = route?.params;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Transfer success</Text>
                <View style={styles.labelValueContainer}>
                    <Text style={styles.label}>Account Balance</Text>
                    <Text style={styles.value}>{amountDisplayFormatter(Number(amount))}</Text>
                </View>
                <View style={styles.labelValueContainer}>
                    <Text style={styles.label}>Account Number</Text>
                    <Text style={styles.value}>{accountNumber}</Text>
                </View>
                <View style={styles.labelValueContainer}>
                    <Text style={styles.label}>Transaction Date</Text>
                    <Text style={styles.value}>{moment(date).format("DD MMM YYYY")}</Text>
                </View>
            </View>
            <CTAButton text='Back to dashboard' onPress={() => { navigation.navigate(Routes.DASHBOARD_SCREEN) }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        alignSelf: "center",
        fontSize: 40,
        fontWeight: "700",
        paddingVertical: 40,
        
    },
    container: {
        flex: 1,
        padding: 24
    },
    labelValueContainer: {
        flexDirection: 'row', justifyContent: "space-between", paddingVertical: 15,
    },
    label: {
        fontSize: 22, fontWeight: "500"
    },
    value: {
        fontSize: 20, fontWeight: '300'
    }
})

export default SuccessTransferScreen;
