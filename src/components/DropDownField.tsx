import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

type DropDownFieldProps = {
    title: string;
    placeholder: string;
    value: string;
    onPress: () => void;
    options: {
        title: string;
        value: string;
    }[];
};

const DropDownField = ({ title, placeholder, value, options, onPress }: DropDownFieldProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title} onPress={onPress}>{title}</Text>
            <View style={styles.valueContainer}>
                <Text style={[styles.value, { color: value ? 'black' : "grey" }]}>{value || placeholder}

                </Text>
                <Image source={require('./../assets/arrowDown.png')} style={styles.image} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    title: {
        fontWeight: "500",
        fontSize: 24,
        paddingBottom: 5,
    },
    value: {
        fontSize: 20,
    },
    valueContainer: {
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: "space-between",
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderColor: 'grey'
    },
    image: {
        marginRight: 10,
        resizeMode: 'contain',
        width: 24,
        height: 24
    },
    container: {
        paddingTop: 20
    }
})

export default DropDownField;
