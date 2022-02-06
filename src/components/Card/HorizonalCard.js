import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles as S } from './styles'

export const HorizontalCard = ({ image, title, subTitle, onPress }) => {

    return (
        <TouchableOpacity onPress={ onPress }>
            <View style={ S.horizontalCardContainer }>
                { image }
                { title }
                { subTitle }
            </View>
        </TouchableOpacity>
    )
}
