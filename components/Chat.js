import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';


export default class Chat extends React.Component {
    render() {

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button style={styles.button}
                    title="Go to Start"
                    onPress={() => this.props.navigation.navigate('Start')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    button: {
        flex: 1,
        justifyContent: "center"
    },

    // text: {
    //     color: 'white',
    //     fontSize: 42,
    //     lineHeight: 84,
    //     fontWeight: 'bold',
    //     textAlign: 'center',
    //     backgroundColor: 'black'
    // }
});