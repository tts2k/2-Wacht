import { colors }from '../../styles';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.card,
        padding: 10,
        flexDirection: "row"
    },
    searchInputContainer: {
        backgroundColor: colors.background,
        width: "100%",
        flexDirection: "row"
    },
    searchIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 4
    }
})

export { styles };
