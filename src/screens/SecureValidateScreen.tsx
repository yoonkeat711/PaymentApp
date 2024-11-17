import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import useValidation, { BiometricAuthFailedResult } from '../hooks/useValidation';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import CTAButton from '../components/CTAButton';
import InputField from '../components/InputField';
import { SecureValidateScreenProps } from '../../App';
import Routes from '../navigation/routes';

export type SecureValidateScreenParams = {
    onApiCall: () => void;
    onSuccess: () => void;
    onFailed: () => void;
};

const SecureValidateScreen = ({ route, navigation }: SecureValidateScreenProps) => {
    const { onApiCall, onSuccess, onFailed } = route?.params;
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [pin, setPin] = useState<string>('');
    const [statusText, setStatusText] = useState<string>('');

    const { triggerBiometric, validateResult } = useValidation();

    useEffect(() => {
        triggerBiometric();
    }, []);

    const onSuccessNavigate = () => {
        navigation.navigate(Routes.SUCCESS_TRANSFER_SCREEN, {
            amount: '12121',
            accountNumber: '3',
            date: new Date(),
        })
    }

    useEffect(() => {
        if (validateResult) {
            if (validateResult?.success) {
                setStatusText("Transfer success!");
                bottomSheetModalRef.current?.present();

            } else if (!validateResult?.success && validateResult?.error === BiometricAuthFailedResult.BIOMETRIC_AUTHENTICATION_FAILED) {
                setStatusText("Transfer failed!");
                bottomSheetModalRef.current?.present();
            }
        }
    }, [validateResult]);

    const onChange = () => { };

    const onValidatePin = useCallback((pin: string) => {
        if (pin === '111111') { // hardcoded pin to 11111 for now for validation
            setStatusText("Transfer success!");
        } else {
            setStatusText("Transfer failed!");
        }
        bottomSheetModalRef.current?.present();
    }, [pin])

    const onPressDone = () => {
        if (validateResult?.success) {
            onSuccess && onSuccess();
        } else {
            onFailed && onFailed();
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <InputField title='Enter Pin' value={pin} setValue={(val) => setPin(val)} inputType='number' placeholder='Enter pin' style={{ width: 200 }} onBlur={(val) => onValidatePin(val)} />
            <Pressable onPress={triggerBiometric} style={styles.faceIdContainer}><Image source={require('./../assets/faceID.png')} style={styles.faceId} /></Pressable>
            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    onChange={onChange}
                >
                    <BottomSheetView style={styles.contentContainer}>
                        <Text style={styles.statusText}>{statusText}</Text>
                        <CTAButton text='Done' onPress={onPressDone} isEnabled />
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        height: 150,
        width: '100%'
    },
    faceIdContainer: {
        paddingTop: 60
    },
    faceId: {
        width: 60,
        height: 60,
        resizeMode: 'contain'
    },
    statusText: {
        fontWeight: '500',
        fontSize: 24
    }
})

export default SecureValidateScreen;
