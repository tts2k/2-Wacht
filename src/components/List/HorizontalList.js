import React from 'react';
import { FlatList, View } from 'react-native';

export const HorizontalList = ({ data, renderItem }) => {
    return (
        <>
            <View>
                <FlatList 
                    data={ data }
                    horizontal={ true }
                    renderItem={ renderItem }
                    keyExtractor={ (item,index) => `${index}${item.id}` }
                />
            </View>
        </>
    )
}
