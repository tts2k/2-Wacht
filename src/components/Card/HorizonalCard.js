import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles as S } from './styles'

export const HorizontalCard = ({ image, text, onPress }) => {

    return (
        <TouchableOpacity onPress={ onPress }>
            <View style={ S.horizontalCardContainer }>
                { image }
                { text }
            </View>
        </TouchableOpacity>
    )
}
