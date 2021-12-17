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
              <Tab.Screen name="Popular Navigation" component={ PopularScreenNavigation } options={{ title: "Popular" }}/>
              <Tab.Screen name="Search Navigation" component={ SearchScreenNavigation } options={{ title: "Search" }}/>
              <Tab.Screen name="My List Navigation" component={ WatchListScreenNavigation } options={{ title: "My List" }} />
          </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
