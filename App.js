import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { BaseNavigation } from './src/navigation/BaseNavigation'
import { MenuProvider } from 'react-native-popup-menu';
import { createDatabase } from './src/utilities/sqlite';

export default function App() {
    useEffect(() => {
        createDatabase();
    })
    return (
        <MenuProvider>
          <BaseNavigation />
          <StatusBar style="light" />
        </MenuProvider>
    );
}
