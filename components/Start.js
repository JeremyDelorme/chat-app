import React from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Pressable } from 'react-native';
//Importing Background Image from assets folder
import BackgroundImage from "../assets/BackgroundImage.png";

//Extending the Start component from App.js
export default class Start extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            bgColor: this.colors.green,
        };
    }

    // Function to Update the State with the new Background Color for Chat Screen Chosen by the User
    changeBgColor = (newColor) => {
        this.setState({ bgColor: newColor });
    };

    //Background Colors to choose from
    colors = {
        black: "#090C08",
        purple: "#474056",
        grey: "#8A95A5",
        green: "#B9C6AE",
    };

    render() {
        return (
            //All components to create the color arrays, titles and buttons.
            <View style={styles.container}>
                <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.backgroundImage}>

                    {/* Title Box */}
                    <View style={styles.titleBox}>
                        <Text style={styles.title}>Welcome To The Super Chat App !</Text>
                    </View>

                    {/* "What's your name?" Box */}
                    <View style={styles.yourNameBox}>
                        <TextInput
                            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                            onChangeText={(text) => this.setState({ name: text })}
                            value={this.state.name}
                            placeholder="What is your name?"
                        />
                    </View>

                    <Text style={styles.text}>Choose Background Color:</Text>

                    {/* Color Array Box */}
                    <View style={styles.colorArray}>
                        <TouchableOpacity
                            style={styles.black}
                            onPress={() => this.changeBgColor(this.colors.black)}
                        ></TouchableOpacity>
                        <TouchableOpacity
                            style={styles.purple}
                            onPress={() => this.changeBgColor(this.colors.purple)}
                        ></TouchableOpacity>
                        <TouchableOpacity
                            style={styles.grey}
                            onPress={() => this.changeBgColor(this.colors.grey)}
                        ></TouchableOpacity>
                        <TouchableOpacity
                            style={styles.green}
                            onPress={() => this.changeBgColor(this.colors.green)}
                        ></TouchableOpacity>
                    </View>

                    {/* Button Box */}
                    <Pressable
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Chat', {
                            name: this.state.name,
                            bgColor: this.state.bgColor
                        })}>
                        <Text style={styles.buttonText}>Start Chatting</Text>
                    </Pressable>
                </ImageBackground>
            </View>
        )
    }
}

//Styles of this Screen
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
        color: '#757083',
        fontSize: 16,
        fontWeight: '300',
        paddingVertical: 10,
    },

    titleBox: {
        height: "40%",
        width: "88%",
        alignItems: "center",
        paddingTop: 100,
        borderRadius: 44,
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        height: 300,
    },

    yourNameBox: {
        borderWidth: 2,
        width: 200,
        borderRadius: 100,
    },

    yourName: {
        borderWidth: 2,
        width: 200,
        borderRadius: 100,
    },

    colorArray: {
        flex: 1,
        justifyContent: 'center',
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-around"
    },

    black: {
        backgroundColor: "#090C08",
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    purple: {
        backgroundColor: "#474056",
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    grey: {
        backgroundColor: "#8A95A5",
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    green: {
        backgroundColor: "#B9C6AE",
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    button: {
        width: "88%",
        height: 70,
        borderRadius: 8,
        backgroundColor: "#757083",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});