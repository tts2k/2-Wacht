import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PopularScreen, MovieDetailScreen } from '../screens';
import { movieListScreenOptions, detailModalOptions } from '../styles';

const Stack = createStackNavigator();

export const PopularScreenNavigation = () => {
    return (
        <Stack.Navigator screenOptions={ movieListScreenOptions }>
            <Stack.Screen name="Popular" component={ PopularScreen }/>
            <Stack.Screen name="Movie Detail" component={ MovieDetailScreen } options={ detailModalOptions }/>
        </Stack.Navigator>
    )
}
