import { colors }from '../../styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: 180,
        padding: 8,
        marginTop: 4,
        borderBottomWidth: 1,
        borderBottomColor: colors.card
    },
    poster: {
        flex: 1,
        height: '100%',
        resizeMode: 'contain'
    },
    body: {
        width: '70%',
        paddingLeft: 4 
    },
    title: {
        color: colors.foreground,
        fontSize: 20,
        fontWeight: 'bold'
    },
    bodyText: {
        color: colors.foreground,
    }
})
