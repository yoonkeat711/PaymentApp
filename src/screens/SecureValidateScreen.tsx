import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import useValidation, { BiometricAuthFailedResult } from '../hooks/useValidation';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import CTAButton from '../components/CTAButton';
import InputField from '../components/InputField';
import { SecureValidateScreenProps } from '../../App';
import Routes from '../navigation/routes';


type DisplaData = {
    label: string;
    value: string;
}
export type SecureValidateScreenParams = {
    onApiCall: () => Promise<any>;
    onSuccess: () => void;
    onFailed: () => void;
    displayData: DisplaData[];
};

const SecureValidateScreen = ({ route, navigation }: SecureValidateScreenProps) => {
    const { onApiCall, onSuccess, onFailed, displayData } = route?.params;
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [pin, setPin] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { triggerBiometric, validateResult } = useValidation();

    useEffect(() => {
        triggerBiometric();
    }, []);

    const onSuccessNavigate = () => {
        navigation.navigate(Routes.SUCCESS_TRANSFER_SCREEN, {
            displayData: displayData,
        })
    }

    const onFetchService = async () => {
        try {
            setIsLoading(true);
            await onApiCall();
            setIsLoading(false);
            onSuccessNavigate();
            onSuccess && onSuccess();
        } catch (error) {
            bottomSheetModalRef.current?.present();
        }
    }

    useEffect(() => {
        if (validateResult) {
            if (validateResult?.success) {
                onFetchService();
            } else if (!validateResult?.success && validateResult?.error === BiometricAuthFailedResult.BIOMETRIC_AUTHENTICATION_FAILED) {
                bottomSheetModalRef.current?.present();
            }
        }
    }, [validateResult]);


    const onValidatePin = useCallback(async (pin: string) => {
        if (pin === '111111') { // Note: hardcoded pin to 11111 for now for validation
            await onFetchService();
        } else {
            bottomSheetModalRef.current?.present();

        }
    }, [pin])

    const onPressDone = () => {
        onFailed && onFailed();
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            {isLoading && <ActivityIndicator size={'large'} />}
            <InputField title='Enter Pin' value={pin} setValue={(val) => setPin(val)} inputType='number' placeholder='Enter pin' style={{ width: 200 }} onBlur={(val) => onValidatePin(val)} />
            <Pressable onPress={triggerBiometric} style={styles.faceIdContainer}><Image source={require('./../assets/faceID.png')} style={styles.faceId} /></Pressable>
            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                >
                    <BottomSheetView style={styles.contentContainer}>
                        <Text style={styles.statusText}>{'Transfer failed!'}</Text>
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
