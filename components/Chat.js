import React, { Component } from 'react';
import { View, Platform, KeyboardAvoidingView, StyleSheet, Text, Button, Flatlist } from 'react-native';
//Imports External Library "Gifted-Chat"
import { GiftedChat, Bubble, SystemMessage, Day, InputToolbar, SendButton, LeftAction, ChatInput } from 'react-native-gifted-chat';

const firebase = require('firebase');
require('firebase/firestore');

//Extends The Chat Component From App.js
export class Chat extends Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            uid: 0,
            user: {
                _id: "",
                name: "",
                avatar: "",
            },
        };

        // SDK from Firestore
        const firebaseConfig = {
            apiKey: "AIzaSyC6yIzEjqukhQIsrzf1vDoLiufR9ZMCr3I",
            authDomain: "chat-app-b008f.firebaseapp.com",
            projectId: "chat-app-b008f",
            storageBucket: "chat-app-b008f.appspot.com",
            messagingSenderId: "192313512553",
            appId: "1:192313512553:web:2c621cf9609e26c1a788f8",
            measurementId: "G-YFKF19TQ21"
        };

        // Initializes the Firestore app
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        //References The Database
        this.referenceChatMessages = firebase.firestore().collection("messages");

    }

    componentDidMount() {
        // Takes The Username From Start.js And Assigns It To The Variable "name"
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });

        this.authUnsubscribe = firebase
            .auth()
            .onAuthStateChanged(async (user) => {
                if (!user) {
                    return await firebase.auth().signInAnonymously();
                }
                //Sets The State For Messages And Username
                this.setState({
                    uid: user.uid,
                    messages: [],
                    user: {
                        _id: user.uid,
                        name: name,
                        avatar: "",
                    },
                });
                this.unsubscribe = this.referenceChatMessages
                    .orderBy('createdAt', 'desc')
                    .onSnapshot(this.onCollectionUpdate);
            });
    }

    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // Goes Through Each Document
        querySnapshot.forEach((doc) => {
            // Gets The QueryDocumentSnapshot's Data
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: data.user,
            });
        });
        this.setState({
            messages,
        });
    };

    //Adds Messages To The Database
    addMessages() {
        const message = this.state.messages[0];
        // Adds The New Messages To The Collection
        this.referenceChatMessages.add({
            uid: this.state.uid,
            _id: message._id,
            text: message.text || '',
            createdAt: message.createdAt,
            user: this.state.user,
        });
    }

    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            this.addMessages();
        });
    }

    componentWillUnmount() {
        // Stops Listening For Changes
        this.unsubscribe();
        // Stops Listening To Authentication
        this.authUnsubscribe();
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#c18a16'
                    },
                    left: {
                        backgroundColor: '#'
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

export default Chat;