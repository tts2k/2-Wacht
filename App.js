import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { BaseNavigation } from './src/navigation/BaseNavigation'
import { MenuProvider } from 'react-native-popup-menu';
import { db } from './src/utilities';
import store from './src/store/store';
import { Provider } from 'react-redux';

export default function App() {
    useEffect(() => {
        db.createDatabase();
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
