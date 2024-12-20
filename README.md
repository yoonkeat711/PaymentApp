

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
yarn android
```

### For iOS

```bash
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

### Assumption
- Fallback to pin method as 11111 for validation (Suppose should have a page for user to create PIN)
- Transaction history should be fetch from API, but this demo just cache on the state storage, which once kill & re-launch the app the list will not be available.


### Implementation
- Using zustand as a state management library, easy to use, small and light
- Exporting biometric validation as a hook for other place reuses purposes.
- Break screen into component so that some component could be reuse in other screen.

### Challenges
- Need little more time, 3 days given, Friday got the assesment, Sat afternoon starts the development, maybe I am not efficient and should start even earlier :)

### Video

Happy flow (biometric enrolled)

https://github.com/user-attachments/assets/c09a45e5-9d6c-4b74-a0b0-03cebe6ac8ff


Biometric not enrolled

https://github.com/user-attachments/assets/f9f85baa-31c8-4af3-8179-579feb110f1f


Fallback PIN success

https://github.com/user-attachments/assets/1d1db8d6-c843-4ee7-8d72-05bc11d38927


Fallback PIN failed



https://github.com/user-attachments/assets/0e187814-63d6-4fc0-9619-3ec0183b6d97



Quick Pay from transaction

https://github.com/user-attachments/assets/d78a37f4-4e6b-46f8-9d7b-f8c45ef1514a




