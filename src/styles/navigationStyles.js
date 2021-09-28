import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from './colors'

export const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color }) => {
        let iconName;
        switch (route.name) {
            case 'Popular':
                iconName = focused ? 'ios-earth' : 'ios-earth-outline';
                break;
            case 'Search':
                iconName = focused ? 'ios-search' : 'ios-search-outline';
                break;
            case 'My List':
                iconName = focused ? 'ios-list' : 'ios-list-outline';
                break;
            default:
        }

        return <Ionicons name={iconName} size={25} color={color} />
    }

});

export const navigationTheme = {
    dark: true,
    colors: {
        primary: colors.primary,
        background: colors.background,
        card: colors.card,
        text: colors.foreground,
        border: colors.border,
        notification: colors.red,
    }
}
