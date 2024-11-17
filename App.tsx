

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import Routes from './src/navigation/routes';
import DashboardScreen from './src/screens/DashboardScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import SecureValidateScreen from './src/screens/SecureValidateScreen';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.DASHBOARD_SCREEN} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Routes.DASHBOARD_SCREEN} component={DashboardScreen} />
        <Stack.Screen name={Routes.PAYMENT_SCREEN} component={PaymentScreen} />
        <Stack.Screen name={Routes.SECURE_VALIDATE_SCREEN} component={SecureValidateScreen} />
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
