import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WatchListScreen, MovieDetailScreen } from '../screens';
import { movieListScreenOptions } from '../styles';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { colors, popupStyles } from '../styles';

const Stack = createStackNavigator();

export const WatchListScreenNavigation = () => {
    const wlOptions = {
        headerRight: () => (
            <Menu>
                <MenuTrigger>
                    <SimpleLineIcons name="options-vertical" size={ 24 } color={ colors.foreground }/>
                </MenuTrigger>
                <MenuOptions customStyles={ popupStyles }>
                    <MenuOption text="Export"/>
                    <MenuOption text="Import"/>
                    <MenuOption text="View stats"/>
                </MenuOptions>
            </Menu>
        )
    }

    return (
        <Stack.Navigator screenOptions={ movieListScreenOptions }>
            <Stack.Screen name="Watch list" component={ WatchListScreen } options={ wlOptions }/>
            <Stack.Screen name="Movie Detail" component={ MovieDetailScreen }/>
        </Stack.Navigator>
    )
}
