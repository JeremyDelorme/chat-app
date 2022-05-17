import React, { Component } from 'react';
import { View, Platform, KeyboardAvoidingView, StyleSheet, Text, Button, Flatlist } from 'react-native';
//Imports External Library "Gifted-Chat"
import { GiftedChat, Bubble, SystemMessage, Day, InputToolbar, SendButton, LeftAction, ChatInput } from 'react-native-gifted-chat';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomActions from "./CustomActions";
import MapView from "react-native-maps";

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
            isConnected: false,
            image: null,
            location: null,
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
        this.refMsgsUser = null;

    }

    //Function To Retrieve Messages Asynchronously Through Asyncstorage
    async getMessages() {
        let messages = '';
        try {
            messages = await AsyncStorage.getItem('messages') || [];
            this.setState({
                messages: JSON.parse(messages)
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    //Function To Save Messages In Asyncstorage
    async saveMessages() {
        try {
            await AsyncStorage.setItem(
                "messages",
                JSON.stringify(this.state.messages)
            );
        } catch (error) {
            console.log(error.message);
        }
    }

    //Function To Delete Messages In Asyncstorage
    async deleteMessages() {
        try {
            await AsyncStorage.removeItem("messages");
            this.setState({
                messages: [],
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    componentDidMount() {
        //Sets Name To The Name Selected On Start Page
        let { name } = this.props.route.params;
        // Adds Name To The Top Of The Screen
        this.props.navigation.setOptions({ title: name });

        //Checks If User Is Online Or Offline 
        NetInfo.fetch().then((connection) => {
            if (connection.isConnected) {
                this.setState({ isConnected: true });
                console.log("online");
                // Listens For Updates In The Collection
                this.unsubscribe = this.referenceChatMessages
                    .orderBy("createdAt", "desc")
                    .onSnapshot(this.onCollectionUpdate);

                //Listens To Authentification Events
                this.authUnsubscribe = firebase
                    .auth()
                    .onAuthStateChanged(async (user) => {
                        if (!user) {
                            return await firebase.auth().signInAnonymously();
                        }

                        //Updates User State With Current User Data
                        this.setState({
                            uid: user.uid,
                            messages: [],
                            user: {
                                _id: user.uid,
                                name: name,
                                avatar: "",
                            },
                        });

                        //References Messages Of Current User
                        this.refMsgsUser = firebase
                            .firestore()
                            .collection("messages")
                            .where("uid", "==", this.state.uid);
                    });
                //Saves Messages When Online
                this.saveMessages();
            } else {
                // When User Is Offline
                this.setState({ isConnected: false });
                console.log("offline");
                //Retrieves Chat From Asyncstorage
                this.getMessages();
            }
        });
    }

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
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                    avatar: data.user.avatar,
                },
                image: data.image || null,
                location: data.location || null,

            });
        });
        this.setState({
            messages,
        });
        this.saveMessages();
    };

    onSend(messages = []) {
        this.setState(
            (previousState) => ({
                messages: GiftedChat.append(previousState.messages, messages),
            }),
            () => {
                this.addMessages();
                this.saveMessages();
            }
        );
    }

    componentWillUnmount() {
        NetInfo.fetch().then((connection) => {
            if (connection.isConnected) {
                // Stops Listening For Changes
                this.unsubscribe();
                // Stops Listening To Authentication
                this.authUnsubscribe();
            }
        });
    }

    //Hides Toolbar When Offline
    renderInputToolbar(props) {
        if (this.state.isConnected == false) {
        } else {
            return <InputToolbar {...props} />;
        }
    }

    renderCustomActions = (props) => {
        return <CustomActions {...props} />;
    };

    renderCustomView(props) {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <View style={{ borderRadius: 13, overflow: 'hidden', margin: 3 }}>
                    <MapView
                        style={{ width: 150, height: 100 }}
                        region={{
                            latitude: currentMessage.location.latitude,
                            longitude: currentMessage.location.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
                </View>
            );
        }
        return null;
    }


    //Adds Background Colors To The Chat Buubles (Left And Right)
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#c18a16'
                    },
                    left: {
                        backgroundColor: '#F1D256'
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
                    renderInputToolbar={this.renderInputToolbar.bind(this)}
                    renderActions={this.renderCustomActions}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    renderCustomView={this.renderCustomView}
                    user={{
                        _id: this.state.user._id,
                        name: this.state.name,
                        avatar: this.state.user.avatar
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