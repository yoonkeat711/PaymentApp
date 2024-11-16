import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { amountDisplayFormatter } from '../utils/amount';

type AmountCardProps = {
    amount: number;
    accountNumber: string;
}

const AmountCard = ({ amount, accountNumber }: AmountCardProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Amount: </Text>
            <Text style={styles.amount}>{amountDisplayFormatter(amount)}</Text>
            <Text style={styles.title}>Account Number: </Text>
            <Text style={styles.accountNumber}>{accountNumber}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#89CFF0',
        borderRadius: 20,
        padding: 20,
        marginVertical: 20
    },
    title: {
        fontSize: 15,
        fontWeight: '200'
    },
    amount: {
        fontSize: 25, fontWeight: '500', paddingBottom: 10
    },
    accountNumber: {
        fontSize: 25,
        fontWeight: '500',
        paddingBottom: 10
    }

})

export default AmountCard;
