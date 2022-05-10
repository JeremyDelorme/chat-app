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
                    <Text style={styles.title}>Welcome To The Super Chat App !</Text>
                    <View style={styles.whiteSquare}>
                        {/* "What's your name?" Box */}
                        <View style={styles.yourNameBox}>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => this.setState({ name: text })}
                                value={this.state.name}
                                placeholder="What is your name?"
                            />
                        </View>

                        <View style={styles.chooseBgColorBox}>
                            <Text style={styles.chooseBgColor}>Choose Background Color</Text>
                        </View>

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
                    </View>

                </ImageBackground>
            </View >
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
    },

    whiteSquare: {
        backgroundColor: "white",
        height: "46%",
        width: "88%",
        justifyContent: "space-around",
        alignItems: "center",
    },
    title: {
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF',
    },

    yourNameBox: {
        fontSize: 16,
        fontWeight: "300",
        color: "#757083",
        opacity: 0.5,
    },

    input: {
        height: 50,
        width: '88%',
        fontSize: 16,
        fontWeight: '800',
        color: '#000000',
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: "#FFFFFF",
        opacity: 100,
        borderRadius: 50,
    },

    chooseBgColorBox: {
        height: 50,
        width: '60%',
        color: '#000000',
        borderRadius: 50,
        justifyContent: 'center'
    },

    chooseBgColor: {
        fontSize: 16,
        fontWeight: "600",
        color: "#757083",
        opacity: 1,
        textAlign: 'center',
        justifyContent: 'center'
    },

    colorArray: {
        width: '88%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',

    },

    black: {
        backgroundColor: "#090C08",
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    purple: {
        backgroundColor: "#474056",
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    grey: {
        backgroundColor: "#8A95A5",
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    green: {
        backgroundColor: "#B9C6AE",
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    button: {
        height: 50,
        width: '88%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#757083",
    },

    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    }
});