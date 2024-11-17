

import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import {
  StyleSheet,
} from 'react-native';

import Routes from './src/navigation/routes';
import DashboardScreen from './src/screens/DashboardScreen';
import PaymentScreen, { PaymentScreenParams } from './src/screens/PaymentScreen';
import SecureValidateScreen, { SecureValidateScreenParams } from './src/screens/SecureValidateScreen';
import 'react-native-gesture-handler';
import useUserStore from './src/stores/userStores';
import SuccessTransferScreen, { SuccessTransferScreenParams } from './src/screens/SuccessTransferScreen';


export type AppStackNavigatorParams = {
  [Routes.DASHBOARD_SCREEN]: undefined;
  [Routes.PAYMENT_SCREEN]: PaymentScreenParams;
  [Routes.SECURE_VALIDATE_SCREEN]: SecureValidateScreenParams;
  [Routes.SUCCESS_TRANSFER_SCREEN]: SuccessTransferScreenParams;
};

export interface SecureValidateScreenProps {
  navigation: StackNavigationProp<AppStackNavigatorParams, Routes.SECURE_VALIDATE_SCREEN>;
  route: RouteProp<AppStackNavigatorParams, Routes.SECURE_VALIDATE_SCREEN>;
}

export interface PaymentScreenProps {
  navigation: StackNavigationProp<AppStackNavigatorParams, Routes.PAYMENT_SCREEN>;
  route: RouteProp<AppStackNavigatorParams, Routes.PAYMENT_SCREEN>;
}

export interface SuccessTransferScreenProps {
  navigation: StackNavigationProp<AppStackNavigatorParams, Routes.SUCCESS_TRANSFER_SCREEN>;
  route: RouteProp<AppStackNavigatorParams, Routes.SUCCESS_TRANSFER_SCREEN>;
}

const Stack = createStackNavigator<AppStackNavigatorParams>();

function App(): React.JSX.Element {
  const { setUserInfo, } = useUserStore();

  useEffect(() => {
        setUserInfo({ name: "Keat", accountBalance: 5000, accountNumber: "111122223333" })
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.DASHBOARD_SCREEN} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Routes.DASHBOARD_SCREEN} component={DashboardScreen} />
        <Stack.Screen name={Routes.PAYMENT_SCREEN} component={PaymentScreen} />
        <Stack.Screen name={Routes.SECURE_VALIDATE_SCREEN} component={SecureValidateScreen} />
        <Stack.Screen name={Routes.SUCCESS_TRANSFER_SCREEN} component={SuccessTransferScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
