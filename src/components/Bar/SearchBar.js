import React from "react";
import { TextInput, View, TouchableOpacity } from "react-native"; 
import { styles as S } from "./styles"
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles";

export const SearchBar = ( props ) => {
    return (
        <View style={ S.container }>
            <View style= { S.searchInputContainer } >
                <View style={ S.searchIcon }>
                    <Ionicons name="md-search-outline" size={18} color={ colors.foreground } />
                </View>
                <TextInput
                    value={ props.value }
                    style={{ color: colors.foreground, width: "85%" }}
                    onChangeText={ props.onChangeText }
                    placeholder="Search movies"
                    placeholderTextColor={ colors.border }
                />
                <TouchableOpacity style={ S.searchIcon } onPress={ props.onClearText }>
                    <Ionicons name="close-outline" size={18} color={ colors.foreground } />
                </TouchableOpacity>
            </View>
        </View>
    )
}
