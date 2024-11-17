import React, { useState } from 'react';
import { Alert, Linking } from 'react-native';
import ReactNativeBiometrics, { BiometryType } from 'react-native-biometrics';


type ValidateResult = {
    success: boolean;
    error?: string;
}

export enum BiometricAuthFailedResult {
    BIOMETRIC_NOT_ENROLLED_OR_UNAVAILABLE = 'Biometric authentication is not available or not enrolled',
    BIOMETRIC_AUTHENTICATION_FAILED = 'Authentication failed',
};

const useValidation = () => {
    const rnBiometrics = new ReactNativeBiometrics();
    const [isBiometricAvailable, setIsBiometricAvailable] = useState<boolean>(false);
    const [biometricType, setBiometricType] = useState<BiometryType | null>(null);
    const [validateResult, setValidateResult] = useState<ValidateResult | null>(null);

    const triggerBiometric = () => {
        return rnBiometrics.isSensorAvailable().then((result) => {
            const { available, biometryType } = result;
            if (available) {
                setIsBiometricAvailable(true);
                setBiometricType(biometryType ?? null);
                validateBiometric();
            } else {
                handleBiometricNotEnrolled();
                setIsBiometricAvailable(false);
                setValidateResult({
                    success: false,
                    error: BiometricAuthFailedResult.BIOMETRIC_NOT_ENROLLED_OR_UNAVAILABLE,
                });
            }
        })
            .catch((error) => {
                setValidateResult({ success: false, error: 'Error checking biometric sensor availability.' });
            });
    };

    const validateBiometric = () => {
        rnBiometrics.simplePrompt({ promptMessage: 'Authenticate with Biometrics' })
            .then((result) => {
                const { success } = result;
                if (success) {
                    setValidateResult({ success: true });
                } else {
                    setValidateResult({ success: false, error: BiometricAuthFailedResult.BIOMETRIC_AUTHENTICATION_FAILED });
                }
            })
            .catch((error) => {
                setValidateResult({ success: false, error: BiometricAuthFailedResult.BIOMETRIC_AUTHENTICATION_FAILED });
            });
    };

    const handleBiometricNotEnrolled = () => {
        Alert.alert(
            'Biometric Not Enrolled',
            'Please set up Face ID or Touch ID in your device settings.',
            [
                { text: 'Cancel' },
                { text: 'Open Settings', onPress: () => Linking.openURL('app-settings:') },
            ],
            { cancelable: false }
        );
    };

    return {
        triggerBiometric,
        isBiometricAvailable,
        validateBiometric,
        validateResult,
        biometricType,
        handleBiometricNotEnrolled,

    }
}
export default useValidation;
