import React from 'react';
import { colors } from './colors'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import store from '../store/store';

export const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color }) => {
        let iconName;
        switch (route.name) {
            case 'Popular Navigation':
                iconName = focused ? 'ios-earth' : 'ios-earth-outline';
                break;
            case 'Search Navigation':
                iconName = focused ? 'ios-search' : 'ios-search-outline';
                break;
            case 'My List Navigation':
                iconName = focused ? 'ios-list' : 'ios-list-outline';
                break;
            default:
        }

        return <Ionicons name={iconName} size={25} color={color} />
    },
    headerShown: false
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

export const movieListScreenOptions = {
    presentation: 'modal'
}

const openLink = () => {
    const url = store.getState().urlToOpen;
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
}

export const detailModalOptions = {
    headerRight: () => (
        <TouchableOpacity onPress={ () => openLink() }>
            <MaterialCommunityIcons name="web" size={25} color={ colors.foreground }  style={{ paddingRight: 10 }}/>
        </TouchableOpacity>
    )
}

