import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PopularScreen, SearchScreen, WatchListScreen } from '../screens'
import { screenOptions, navigationTheme } from '../styles';

const Tab = createBottomTabNavigator();

export const BaseNavigation = () => {
  return (
    <>
      <NavigationContainer theme={navigationTheme}>
          <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Popular" component={ PopularScreen } />
            <Tab.Screen name="Search" component={ SearchScreen } />
            <Tab.Screen name="My List" component={ WatchListScreen } />
          </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
