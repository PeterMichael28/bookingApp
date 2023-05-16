import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigator';
import { ModalPortal } from "react-native-modals";
import { Provider } from 'react-redux';
import store from './store/store';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
    <Provider store={store}>
      <StackNavigator />
      <ModalPortal />
      <Toast />
      </Provider>
    </>
  );
}


