import React, { Component } from 'react';
import { View, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
//Importing external library "Gifted-Chat"
import { GiftedChat, Bubble } from 'react-native-gifted-chat'

//Extending the Chat component from App.js
export class Chat extends Component {
    constructor() {
        super();
        this.state = {
            messages: [],
        }
    }

    componentDidMount() {
        // Takes the username fro Start.js and assigns it to the variable "name"
        let name = this.props.route.params.name;

        //Sets the state for messages and username
        this.setState({
            messages: [
                //Initial static message to welcome the user
                {
                    _id: 1,
                    text: "Hello " + name + " :)",
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                //System message informing about when user was last active
                {
                    _id: 2,
                    text: name + " has entered the chat",
                    createdAt: new Date(),
                    system: true,
                },
            ],
        })
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#c18a16'
                    }
                }}
            />
        )
    }

    render() {
        //Creating variable "name" for the username entered in the start screen
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });

        //Creating variable "newColor" for the Chat screen' background color chosen by the user within the choices given
        let bgColor = this.props.route.params.bgColor;

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: bgColor,
                }}
            >
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
                {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
                }
            </View>
        )
    }
}

//Styles of this Screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    giftedChat: {
        flex: 1,
        width: "75%",
        paddingBottom: 10,
        justifyContent: "center",
        borderRadius: 5,
    },
});

export default Chat 