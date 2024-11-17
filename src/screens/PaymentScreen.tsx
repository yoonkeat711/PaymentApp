import React, { useEffect, useState } from 'react';
import { Keyboard, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View, KeyboardAvoidingView } from 'react-native';
import InputField from '../components/InputField';
import AmountCard from '../components/AmountCard';
import useUserStore from '../stores/userStores';
import * as Yup from 'yup';
import COLORS from '../constants/colors';
import DropDownField from '../components/DropDownField';

const PaymentScreen = () => {
    const { userInfo } = useUserStore();
    const [amount, setAmount] = useState<string>('');
    const [accountNumber, setAccountNumber] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
    console.log(userInfo?.accountBalance, 'account blanace');

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
console.log("Jere");
    };

    useEffect(() => {
        if (amount && accountNumber) {
            setIsButtonEnabled(true);
        } else {
            setIsButtonEnabled(false);
        }
    }, [amount, accountNumber])

    return (
        <SafeAreaView style={styles.safeArea}>
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

                    {/* <DropDownField title="Transfer type" value='' placeholder='Select transfer type' options={[{ title: "Mobile number", value: "mobileNumber"}, { title: "Account number", value: "accountNumber" }]}  /> */}
                </ScrollView>
            </TouchableWithoutFeedback>

            <Pressable onPress={onPressTransfer} style={[styles.buttonContainer, { backgroundColor: isButtonEnabled ? COLORS.PRIMARY : COLORS.DISABLED }]} disabled={!isButtonEnabled}>
                <Text style={styles.buttonText}>Transfer</Text>
            </Pressable>
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
    buttonContainer: {
        margin: 20,
        backgroundColor: COLORS.PRIMARY,
        padding: 20,
        alignItems: 'center',
        borderRadius: 30
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: '500'
    },
    topContainer: {
        padding: 24,
        flex: 1,
        marginBottom: 20,
    }

})

export default PaymentScreen;
