import React from 'react';
import { TouchableOpacity, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles';

export const HeaderOpenLinkButton = ({ url }) => {
    let openLink = () => {
        Linking.openURL(url);
    }
    return (
        <TouchableOpacity onPress={ openLink }>
            <MaterialCommunityIcons name="web" size={25} color={ colors.foreground }  style={{ paddingRight: 10 }}/>
        </TouchableOpacity>
    )
}
