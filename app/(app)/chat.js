import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import ChatHeader from '../../components/ChatHeader';
import MessageList from '../../components/MessageList';
import { Feather } from '@expo/vector-icons';
import KeyboardView from '../../components/keyboardView';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAuth } from '../../context/authContext';
import { Timestamp, setDoc, doc, addDoc, collection, orderBy, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../util/firebase';


export default function Chat() {
    const item = useLocalSearchParams(); // second user
    const { user } = useAuth(); // current user
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const textRef = useRef("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (user && item) {
            createChatifNotExist();
        }

        const chatId = getChatId(user?.userId, item?.userId);
        const docRef = doc(db, 'chats', chatId);
        const messageRef = collection(docRef, 'messages');
        const que = query(messageRef, orderBy('createdAt', 'asc'));

        let unsubscribe = onSnapshot(que, (querySnapshot) => {
            let allMessages = querySnapshot.docs.map(doc => {
                return doc.data();
            });
            setMessages([...allMessages]);
        })
    return unsubscribe;
    
}, []);

const getChatId = (userId1, userId2) => {
    const sortedIds = [userId1, userId2].sort();
    const chatId = sortedIds.join('_');
    return chatId;
}
const createChatifNotExist = async () => {
    try {
        const chatId = getChatId(user?.userId, item?.userId);
        await setDoc(doc(db, "chats", chatId), {
            chatId: chatId,
            createdAt: Timestamp.fromDate(new Date()),
        });
        console.log('Chat created with ID:', chatId);
    } catch (error) {
        console.error('Error creating chat:', error);
    }
}

const sendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;
    try {
        let chatId = getChatId(user?.userId, item?.userId);
        const docRef = doc(db, 'chats', chatId);
        const messageRef = collection(docRef, 'messages');
        textRef.current = "";
        if (inputRef.current) inputRef?.current?.clear();
        const newDoc = await addDoc(messageRef, {
            userId: user?.userId,
            message: message,
            createdAt: Timestamp.fromDate(new Date()),
            profileUrl: user?.profileUrl,
            nameOfSender: user?.username
        });

        console.log('Message sent with ID:', newDoc.id);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}
console.log('messages :', messages);
return (
    <KeyboardView inChat={true}>
        <View className="flex-1 bg-white">
            <StatusBar style="dark" />
            <ChatHeader user={item} router={router} />
            <View className="h-3 border-b border-neutral-300" />
            <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
                <View className="flex-1">
                    <MessageList messages={messages} currentUser={user} />
                </View>
                <View style={{ marginBottom: hp(2.5) }} className="pt-2">
                    <View className="flex-row justify-between bg-white border border-neutral-300 p-2 rounded-full pl-5 ">
                        <TextInput
                            ref={inputRef}
                            onChangeText={value => textRef.current = value}
                            style={{ fontSize: hp(2) }}
                            placeholder='Type a message'
                            className="flex-1 mr-2"
                        />
                        <Pressable onPress={sendMessage} className="bg-neutral-200 rounded-full p-2">
                            <Feather name="send" size={hp(3)} color="black" />
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    </KeyboardView>
)
}