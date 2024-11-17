import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import * as Yup from 'yup';

type InputFieldProps = {
    title: string;
    inputType: 'string' | 'number' | 'amount';
    placeholder: string;
    value: string;
    setValue: (val: string) => void;
    validationSchema?: Yup.AnySchema<any> | undefined;
    onError?: (val: boolean) => void;
    style?: StyleProp<TextStyle>;
    onBlur?: (val: string) => void;

}
const InputField = ({ title, value, validationSchema, inputType, setValue, placeholder, onError, style, onBlur }: InputFieldProps) => {
    const [errorMessage, setErrorMessage] = useState<string>('');

    const keyboardType = () => {
        switch (inputType) {
            case 'string': return 'default';
            case 'number': return 'number-pad';
            case 'amount': return 'decimal-pad';
            default: return 'default';
        }
    };

    useEffect(() => {
        if (validationSchema && value) {
            validateScheme();
        }
    }, [value]);

    const validateScheme = async () => {
        try {
            setErrorMessage('');
            await validationSchema?.validate(value);
            onError && onError(false);
        } catch (error: unknown) {
            if (error instanceof Yup.ValidationError) {
                setErrorMessage(error?.message);
                onError && onError(true);
            }
            else {
                setErrorMessage("Unknown error");
                onError && onError(true);
            }

        }
    }

 
    return (
        <View>
            <Text style={styles.title}>{title}</Text>
            <TextInput
                // onSubmitEditing={  (e) => onSubmit && onSubmit(e.nativeEvent.text)}
                onBlur={(e) => onBlur && onBlur(e.nativeEvent.text)}
                style={[styles.inputField, { borderColor: errorMessage ? 'red' : "grey" }, style]}
                value={value}
                onChangeText={setValue}
                keyboardType={keyboardType()}
                placeholder={placeholder}
                returnKeyType='next'
            />
            {!!errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    inputField: {
        borderRadius: 20,
        fontSize: 20,
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    title: {
        fontWeight: "500",
        fontSize: 18,
        paddingTop: 15,
        paddingBottom: 5,
    },
    errorMessage: {
        color: 'red',
        paddingTop: 4
    }
})

export default InputField;

