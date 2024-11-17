import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import COLORS from '../constants/colors';

type CTAButtonProps = {
    text: string;
    isEnabled?: boolean;
    onPress: () => void;
}
const CTAButton = ({ text, isEnabled = true, onPress }: CTAButtonProps) => {
    return (
        <Pressable onPress={onPress} style={[styles.buttonContainer, { backgroundColor: isEnabled ? COLORS.PRIMARY : COLORS.DISABLED }]} disabled={!isEnabled}>
            <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
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
})

export default CTAButton