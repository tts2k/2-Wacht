import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { BaseNavigation } from './src/navigation/BaseNavigation'
import { MenuProvider } from 'react-native-popup-menu';
import { createDatabase } from './src/utilities/sqlite';
import store from './src/store/store';
import { Provider } from 'react-redux';

export default function App() {
    useEffect(() => {
        createDatabase();
    })
    return (
        <Provider store={store}>
            <MenuProvider>
              <BaseNavigation />
              <StatusBar style="light" />
            </MenuProvider>
        </Provider>
    );
}
