import React, { useState } from 'react';
import { Text, TouchableOpacity, Image, View, ToastAndroid } from 'react-native';
import Menu, { MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'
import { useNavigation } from '@react-navigation/native';
import { styles as S } from './styles';
import { deleteMovie, updateStatus} from '../../utilities/sqlite';
import { useDispatch } from 'react-redux';
import { INSERT_MOVIE } from '../../store/taskTypes';
import { Picker } from '@react-native-picker/picker';
import { colors, popupStyles } from '../../styles';

export const WLMovieCard = ({ movie }) => {
    let menu;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [status, setStatus]  = useState(movie.status);

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

    const onStatusChange = (itemValue) => {
        setStatus(itemValue);
        movie.status = itemValue;
        updateStatus(movie.id, itemValue)
    }

    return (
        <TouchableOpacity style={ S.container } onPress={ openDetailScreen } onLongPress={ () => openMenu() }>
            <Image source={{ uri: `data:image/jpg;base64,${movie.poster}`}} style={ S.poster }/>
            <View style={ S.body }>
                <Text style={ S.title } numberOfLines={2}>{ movie.name }</Text>
                <Text style={ S.bodyText }>{ movie.release_date }</Text>
                <Text style={ S.bodyText }>Score: { movie.score }</Text>
                <View style={ S.pickerContainer }>
                    <Picker
                        selectedValue={ status }
                        onValueChange={ onStatusChange }
                        style={ S.picker }
                        mode="dropdown"
                        dropdownIconColor={ colors.foreground }
                    >
                        <Picker.Item label="Planned" value="Planned" />
                        <Picker.Item label="Watching" value="Waching" />
                        <Picker.Item label="On-hold" value="On-Hold" />
                    </Picker>
                </View>
            </View>
            <Menu ref={ onRef }>
                <MenuTrigger text=''/>
                <MenuOptions customStyles={ popupStyles }>
                    <MenuOption onSelect={ () => addToLocalList() } value={1} text="Delete from watch list" />
                </MenuOptions>
            </Menu>
        </TouchableOpacity>
    );
}
