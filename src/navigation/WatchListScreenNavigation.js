import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WatchListScreen, MovieDetailScreen, StatisticsScreen } from '../screens';
import { movieListScreenOptions } from '../styles';

const Stack = createStackNavigator();

export const WatchListScreenNavigation = () => {
    return (
        <Stack.Navigator screenOptions={ movieListScreenOptions }>
            <Stack.Screen name="Watch list" component={ WatchListScreen }/>
            <Stack.Screen name="Movie Detail" component={ MovieDetailScreen }/>
            <Stack.Screen name="Statistics" component={ StatisticsScreen }/>
        </Stack.Navigator>
    )
}
