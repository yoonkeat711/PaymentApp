import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import useValidation from '../hooks/useValidation';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Routes from '../navigation/routes';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import CTAButton from '../components/CTAButton';
import InputField from '../components/InputField';

type SecureValidateScreenParams = {
    onApiCall: () => void;
    onSuccess: () => void;
    onFailed: () => void;
};

const SecureValidateScreen = ({ onApiCall, onSuccess, onFailed }: SecureValidateScreenParams) => {
    const navigation = useNavigation();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [pin, setPin] = useState<string>('');
    const [statusText, setStatusText] = useState<string>('');

    const { triggerBiometric, validateResult } = useValidation();

    // useFocusEffect(() => {
    //     triggerBiometric();
    // }, []);

    useFocusEffect(useCallback(() => {
        triggerBiometric();
    }, []));



    const onNavigateDashboard = () => {
        navigation.navigate(Routes.DASHBOARD_SCREEN);
    }

    useEffect(() => {
        if (validateResult) {
            if (validateResult?.success) {
                setStatusText("Transfer success");
                bottomSheetModalRef.current?.present();

            } else if (!validateResult?.success && validateResult?.error === 'Authentication failed' ) {
                setStatusText("Transfer failed");
                bottomSheetModalRef.current?.present();
            }
        }
    }, [validateResult]);

    const onChange = () => { };

    const onValidatePin = (pin: string) => {
        console.log(pin, 'on');
    }

    const onPressDone = () => {
        if (validateResult?.success) {
            onSuccess && onSuccess();
        } else {
            onFailed && onFailed();
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <InputField title='Enter Pin' value={pin} setValue={(val) => setPin(val)} inputType='number' placeholder='Enter pin' style={{ width: 200 }} onSubmit={(val) => onValidatePin(val)} />
            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    onChange={onChange}
                >
                    <BottomSheetView style={styles.contentContainer}>
                        <Text>{statusText}</Text>
                        <CTAButton text='Done' onPress={onNavigateDashboard} isEnabled />
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
})

export default SecureValidateScreen;
