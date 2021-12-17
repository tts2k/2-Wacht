import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchScreen, MovieDetailScreen } from '../screens';
import { movieListScreenOptions, detailModalOptions } from '../styles';

const Stack = createStackNavigator();

export const SearchScreenNavigation = () => {
    return (
        <Stack.Navigator screenOptions={ movieListScreenOptions }>
            <Stack.Screen name="Search" component={ SearchScreen }/>
            <Stack.Screen name="Movie Detail" component={ MovieDetailScreen } options={ detailModalOptions }/>
        </Stack.Navigator>
    )
}
