import { colors }from '../../styles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: 180,
        padding: 8,
        marginTop: 4,
        borderBottomWidth: 1,
        borderBottomColor: colors.card,
    },
    poster: {
        flex: 1,
        height: '100%',
        resizeMode: 'contain'
    },
    body: {
        flexDirection: 'column',
        width: '70%',
        height: '100%',
        paddingLeft: 4,
        overflow: 'hidden',
    },
    title: {
        color: colors.foreground,
        fontSize: 20,
        fontWeight: 'bold'
    },
    bodyText: {
        color: colors.foreground,
    },
    picker: {
        color: colors.foreground,
        height: 50,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: colors.border,
        marginTop: 20
    }
})

export { styles };
