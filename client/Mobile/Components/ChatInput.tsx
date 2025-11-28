import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { useMessages } from '@/store/messageContext';
import { useSettings } from "@/store/settingsContext";


export default function ChatInput() {
    const [text, setText] = useState("");
    const { sendMessage } = useMessages();
    const { themeColor } = useSettings()


    const sendTheMessage = () => {
        if (!text.trim()) return;
        sendMessage(text, "me")
        setText("")
    }

    return (
        <View style={styles.inputView} >
            <View style={
                [styles.inputTaker,
                { borderColor: themeColor.text }
                ]}
            >
                <TextInput
                    autoFocus
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={sendTheMessage}
                    placeholder="Type a message.. "
                    placeholderTextColor={""}
                    style={[styles.textInput, { color: themeColor.text }]}
                />
            </View>
            <View style={styles.buttomRowRightView}>
                <TouchableOpacity onPress={sendTheMessage} style={styles.sendButton}>
                    <Ionicons name="send" size={18} color={themeColor.primary} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputView: {
        position: "absolute",
        bottom: 10,
        margin: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
        width: '100%'
    },

    inputTaker: {
        width: '85%',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderColor: 'white',
        borderRadius: 50,
    },

    textInput: {
        height: '100%',
        width: '100%',
        outlineWidth: 0
    },

    buttomRowRightView: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
})