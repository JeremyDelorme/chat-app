import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground } from 'react-native';

import BackgroundImage from "../assets/BackgroundImage.png";

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "" };
    }

    render() {
        // let name = this.props.route.params.name;
        // this.props.navigation.setOptions({ title: name });
        return (
            <View style={styles.container}>
                <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.backgroundImage}>
                    <View style={styles.titleBox}>
                        <Text style={styles.title}>Chat App !!</Text>
                    </View>

                    <View style={styles.yourNameBox}>
                        <TextInput
                            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                            onChangeText={(text) => this.setState({ name: text })}
                            value={this.state.name}
                            placeholder="What is your name?"
                        />
                    </View>
                    <View styles={styles.yourName}>

                    </View>
                    <View styles={styles.chooseYourBackgroundColor}>

                    </View>

                    <Button
                        title="Go to Chat"
                        onPress={() =>
                            this.props.navigation.navigate("Chat", { name: this.state.name })
                        }
                    />
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    backgroundImage: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },

    text: {
        color: 'white',
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'black'
    },


    titleBox: {
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },

    yourNameBox: {
        borderWidth: 2,
    },

    yourName: {

    }
});