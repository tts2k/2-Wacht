import React from "react";
import {View, Text } from "react-native";
import { colors } from '../styles';

export const MovieDetailScreen = ({ route }) => {
    return (
        <View>
            <Text style={{ fontSize: 30, color: colors.foreground }}>Movie Detail Screen</Text>
            <Text style={{ fontSize: 30, color: colors.foreground }}>Movie Id: { route.params.id }</Text>
        </View>
    )
}
