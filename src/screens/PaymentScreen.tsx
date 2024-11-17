import React, { useEffect, useState } from 'react';
import { Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import InputField from '../components/InputField';
import AmountCard from '../components/AmountCard';
import useUserStore from '../stores/userStores';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import Routes from '../navigation/routes';
import CTAButton from '../components/CTAButton';
import useHistoryStore from '../stores/historyStores';
import { TransferType } from '../constants/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackNavigatorParams, PaymentScreenProps } from '../../App';
import payment from '../services/payment';
import { amountDisplayFormatter } from '../utils/number';
import moment from 'moment';


export type PaymentScreenParams = {
    accountNumber?: string;
};

type NavigationProps = StackNavigationProp<AppStackNavigatorParams, Routes.PAYMENT_SCREEN>;

const PaymentScreen = ({ route }: PaymentScreenProps) => {

    const { userInfo, setUserInfo } = useUserStore();
    const { transactionHistories } = useHistoryStore();

    const [amount, setAmount] = useState<string>('');
    const [isAmountError, setIsAmountEror] = useState<boolean>(false);
    const [accountNumber, setAccountNumber] = useState<string>(route?.params?.accountNumber ?? '');
    const [note, setNote] = useState<string>('');
    const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
    const navigation = useNavigation<NavigationProps>();

    const amountValidationScheme = Yup.string()
        .required('Amount is required.')
        .test('max-value', 'Insufficient balance', (value) => {
            if (value && userInfo?.accountBalance && parseFloat(value) > userInfo?.accountBalance) {
                return false;
            }
            return true;
        })
        .matches(
            /^[0-9]*\.?[0-9]+$/,
            'Invalid amount'
        );

    const onPressTransfer = () => {
        navigation.navigate(Routes.SECURE_VALIDATE_SCREEN, {
            onApiCall: onFetchPayment,
            onSuccess: onSuccessTransfer,
            onFailed: onFailedTransfer,
            displayData: [
                {
                    label: "Amount",
                    value: amountDisplayFormatter(parseFloat(amount))
                },
                {
                    label: "Receipient Account",
                    value: accountNumber,
                },
                {
                    label: "Transaction Date",
                    value: moment(new Date()).format("DD MMM YYYY"),
                },
            ],
        });
    };

    const onSuccessTransfer = () => {

        setUserInfo({
            ...userInfo,
            accountBalance: userInfo?.accountBalance - parseFloat(amount),
        });

        transactionHistories.unshift({
            date: new Date(),
            title: 'Transfer',
            amount: parseFloat(amount),
            accountNumber: Number(accountNumber),
            transferType: TransferType.DEBIT,
        });
    }

    const onFailedTransfer = () => {
        navigation.navigate(Routes.DASHBOARD_SCREEN);
    };

    const onFetchPayment = async () => {
        await payment.fetchPaymentService(parseFloat(amount), accountNumber);
    }

    useEffect(() => {
        if (amount && accountNumber && !isAmountError) {
            setIsButtonEnabled(true);
        } else {
            setIsButtonEnabled(false);
        }
    }, [amount, accountNumber])

    return (
        <SafeAreaView style={styles.safeArea}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('./../assets/arrowLeft.png')} style={styles.backButton} />
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView style={styles.topContainer}>
                    <Text style={styles.title}>Transfer</Text>
                    <KeyboardAvoidingView behavior='position'>
                        <AmountCard accountNumber={userInfo?.accountNumber} amount={userInfo?.accountBalance} />
                        <InputField title='Amount'
                            value={amount}
                            setValue={(val) => setAmount(val)}
                            validationSchema={amountValidationScheme}
                            inputType='amount'
                            placeholder='Enter amount'
                            onError={(val) => setIsAmountEror(val)}
                        />
                        <InputField title='Account number'
                            value={accountNumber}
                            setValue={(val) => setAccountNumber(val)}
                            inputType='number'
                            placeholder='Enter account number'
                        />
                        <InputField title='Note (optional)'
                            value={note}
                            setValue={(val) => setNote(val)}
                            inputType='string'
                            placeholder='Enter note (optional)'
                        />
                    </KeyboardAvoidingView>
                </ScrollView>
            </TouchableWithoutFeedback>
            <CTAButton
                text='Transfer'
                onPress={onPressTransfer}
                isEnabled={isButtonEnabled}
            />

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    title: {
        fontSize: 30,
        fontWeight: '500'
    },

    topContainer: {
        padding: 24,
        flex: 1,
        marginBottom: 20,
    },
    backButton: {
        resizeMode: 'contain', margin: 10
    }

})

export default PaymentScreen;
