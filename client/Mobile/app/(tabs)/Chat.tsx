import { KeyboardAvoidingView, Platform, StyleSheet, View, Text, ScrollView } from "react-native";

import { useMessages } from "@/store/messageContext";
import ChatInput from "@/Components/ChatInput";
import { useSettings } from "@/store/settingsContext";

export default function Chat() {
    const { themeColor, settings } = useSettings()
    const { messages } = useMessages();

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={90}
        >
            <View style={[styles.screen, { backgroundColor: themeColor.background }]}>
                <ScrollView contentContainerStyle={{ paddingBottom: 70 }} style={styles.msgsArea} >
                    {messages.map(message => (
                        <View key={message.id} style={[styles.msgView, message.sender === settings.username ? { alignSelf: 'flex-end', backgroundColor: 'gray' } : { backgroundColor: themeColor.primary, alignSelf: 'flex-start' }]}>
                            <Text style={styles.msg}>{message.text}</Text>
                            <View style={styles.msgDetails}>
                                <Text style={styles.msgSender}>{message.sender}</Text>
                                <Text style={styles.msgSender}>
                                    {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </Text>
                            </View>
                        </View>
                    )
                    )}
                </ScrollView>
                <ChatInput />
            </View>
        </KeyboardAvoidingView >
    );

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        position: 'relative'
    },
    msgsArea: {
        flex: 1,
        width: '95%',
        alignSelf: 'center',
        flexDirection: 'column-reverse'
    },
    msgView: {
        minWidth: '45%',
        maxWidth: '80%',
        margin: 2,
        padding: 3,
        borderRadius: 5
    },
    msg: {
        padding: 2,
        color: "white",
        paddingHorizontal: 5
    },
    msgDetails: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    msgSender: {
        fontSize: 10,
        color: 'white'
    }

});
