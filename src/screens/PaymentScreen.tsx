import React, { useState } from 'react';
import { Keyboard, Pressable, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import InputField from '../components/InputField';
import AmountCard from '../components/AmountCard';
import useUserStore from '../stores/userStores';
import * as Yup from 'yup';
import COLORS from '../constants/colors';

const PaymentScreen = () => {
    const { userInfo } = useUserStore();
    const [amount, setAmount] = useState<string>('');
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

    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.topContainer}>
                    <Text style={styles.title}>Transfer</Text>
                    <AmountCard accountNumber={userInfo?.accountNumber} amount={userInfo?.accountBalance} />
                    <InputField title='Amount'
                        value={String(amount)}
                        setValue={(val) => setAmount(val)}
                        validationSchema={amountValidationScheme}
                        inputType='amount'
                        placeholder='Please enter amount'
                    />
                </View>
            </TouchableWithoutFeedback>

            <Pressable onPress={onPressTransfer} style={styles.buttonContainer} disabled={!isButtonEnabled}>
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
        flex: 1
    }

})

export default PaymentScreen;
