import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: '2.5%',
        flex: 1
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
        fontSize: 32,
        color: 'white'
    },
    input: {
        backgroundColor: 'white',
        marginBottom: 20,
        paddingBottom: 5
    },
    button: {
        backgroundColor: '#28303B',
    },
    textButton: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: 'white'
    },
    link: {
        color: 'white',
        marginTop: 60,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase'
    }
})

export default globalStyles;