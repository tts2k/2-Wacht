import React from 'react';
import { Text, TouchableOpacity, Image, View, ToastAndroid } from 'react-native';
import Menu, { MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'
import { useNavigation } from '@react-navigation/native';
import { styles as S, optionsStyles} from './styles';
import { deleteMovie } from '../../utilities/sqlite';
import { useDispatch } from 'react-redux';
import { INSERT_MOVIE } from '../../store/taskTypes';

export const WLMovieCard = ({ movie }) => {
    let menu;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const openDetailScreen = () => {
        navigation.navigate('Movie Detail', { id: movie.id });
    }

    const addToLocalList = () => {
        deleteMovie(movie.id);
        dispatch({ type: INSERT_MOVIE })
        ToastAndroid.show("Deleted from local list", ToastAndroid.SHORT)
    }

    const openMenu = () => {
        menu.open();
    }

    const onRef = r => {
        menu = r;
    }

    return (
        <TouchableOpacity style={ S.container } onPress={ openDetailScreen } onLongPress={ () => openMenu() }>
            <Image source={{ uri: `data:image/jpg;base64,${movie.poster}`}} style={ S.poster }/>
            <View style={ S.body }>
                <Text style={ S.title } numberOfLines={2}>{ movie.name }</Text>
                <Text style={ S.bodyText }>{ movie.release_date }</Text>
                <Text style={ S.bodyText }>Score: { movie.score }</Text>
                <View>
                    <Text style={ S.bodyText } numberOfLines={4}>{ movie.synopsis }</Text>
                </View>
            </View>
            <Menu ref={ onRef }>
                <MenuTrigger text=''/>
                <MenuOptions customStyles={ optionsStyles }>
                    <MenuOption onSelect={ () => addToLocalList() } value={1} text="Delete from watch list" />
                </MenuOptions>
            </Menu>
        </TouchableOpacity>
    );
}
