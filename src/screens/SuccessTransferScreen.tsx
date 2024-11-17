import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { SuccessTransferScreenProps } from '../../App';
import CTAButton from '../components/CTAButton';
import Routes from '../navigation/routes';

export type SuccessTransferScreenParams = {
    displayData: {
        label: string;
        value: string;
    }[];
};

const SuccessTransferScreen = ({ route, navigation }: SuccessTransferScreenProps) => {
    const { displayData } = route?.params;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Transfer success</Text>
                {
                    displayData.map((item, index) => {
                        return (
                            <View style={styles.labelValueContainer} key={`${item?.value}-${index}`}>
                                <Text style={styles.label}>{item?.label}</Text>
                                <Text style={styles.value}>{item?.value}</Text>
                            </View>
                        )
                    })
                }
            </View>
            <CTAButton text='Back to dashboard' onPress={() => { navigation.navigate(Routes.DASHBOARD_SCREEN) }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        alignSelf: "center",
        fontSize: 40,
        fontWeight: "700",
        paddingVertical: 40,

    },
    container: {
        flex: 1,
        padding: 24
    },
    labelValueContainer: {
        flexDirection: 'row', justifyContent: "space-between", paddingVertical: 15,
    },
    label: {
        fontSize: 22, fontWeight: "500"
    },
    value: {
        fontSize: 20, fontWeight: '300'
    }
})

export default SuccessTransferScreen;
