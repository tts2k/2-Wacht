import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PopularScreenNavigation } from './PopularScreenNavigation';
import { WatchListScreenNavigation } from './WatchListScreenNavigation';
import { SearchScreenNavigation } from './SearchScreenNavigation';
import { screenOptions, navigationTheme } from '../styles';

const Tab = createBottomTabNavigator();

export const BaseNavigation = () => {
  return (
    <>
      <NavigationContainer theme={ navigationTheme }>
          <Tab.Navigator screenOptions={ screenOptions }>
            <Tab.Screen name="Popular Navigation" component={ PopularScreenNavigation } />
            <Tab.Screen name="Search Navigation" component={ SearchScreenNavigation } />
            <Tab.Screen name="My List Navigation" component={ WatchListScreenNavigation } />
          </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
