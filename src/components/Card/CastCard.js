import React from 'react';
import { Text, Image, Linking } from 'react-native';
import { HorizontalCard } from './HorizonalCard';
import { styles as S } from './styles'

export const CastCard = ({ cast }) => {

    const openCreditLink = () => {
        Linking.openURL(`https://themoviedb.org/person/${cast.id}`);
    }

    const image = (
        <Image source={{ uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${cast.profile_path}` }} style={ S.horizontalCardImage }/>
    )

    const text = (
        <Text style={ S.smallTitle }>{ cast.name + '\n' } </Text>
    )

    return (
        <HorizontalCard
            image={ image }
            text={ text }
            onPress={ openCreditLink }
        />
    )
}
