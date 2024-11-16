import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';


type InputFieldProps = {
    title: string;
    placeholder: string;
    value: string;
    validationSchema?: object;

}
const InputField = ({ title, value, validationSchema }: InputFieldProps) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
    return (
        <View>
            <Text style={{fontWeight: "500"}}>{title}</Text>
            <TextInput
                style={styles.inputField}
                value={value}
            />
            {!!errorMessage && <Text>{errorMessage}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    inputField: {
        borderRadius: 4,
    }
})

export default InputField;

