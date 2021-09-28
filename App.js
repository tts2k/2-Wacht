import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { BaseNavigation } from './src/navigation/BaseNavigation'

export default function App() {
  return (
      <>
        <BaseNavigation />
        <StatusBar style="light" />
      </>
  );
}
