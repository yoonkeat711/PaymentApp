/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
 
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Routes from './src/navigation/routes';
import DashboardScreen from './src/screens/DashboardScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import SecureValidateScreen from './src/screens/SecureValidateScreen';
import  'react-native-gesture-handler';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>

    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.DASHBOARD_SCREEN} screenOptions={{headerShown: false}}>
        <Stack.Screen name={Routes.DASHBOARD_SCREEN} component={DashboardScreen} />
        <Stack.Screen name={Routes.PAYMENT_SCREEN} component={PaymentScreen} />
        <Stack.Screen name={Routes.SECURE_VALIDATE_SCREEN} component={SecureValidateScreen} />
      </Stack.Navigator>

    </NavigationContainer>
    // </GestureHandlerRootView>
  )

  // return (
  //    <SafeAreaView style={backgroundStyle}>
  //    <Text>{'sddsd'}</Text>
  //    </SafeAreaView>
  // );
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
