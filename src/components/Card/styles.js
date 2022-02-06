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
    horizontalCardImage: {
        width: 100,
        height: 150,
        alignSelf: "center"
    },
    horizontalCardContainer: {
        paddingRight: 20,
        marginTop: 8,
        width: 120
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
    smallTitle: {
        color: colors.foreground,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    smallSubTitle: {
        color: colors.foreground,
        fontSize: 10,
        textAlign: 'center'
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
