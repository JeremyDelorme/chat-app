import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';


export default class Chat extends React.Component {
    render() {
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });

        let newColor = this.props.route.params.newColor;
        this.props.navigation.setOptions({ color: newColor });

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

//Styles of this Screen
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
});