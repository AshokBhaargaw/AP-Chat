import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useSettings } from "@/store/settingsContext";
import { dismissAll } from "expo-router/build/global-state/routing";

export default function Settings() {
    const { settings, themeColor, dispatch } = useSettings();

    // Dropdown states
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: "System theme", value: "system" },
        { label: "Light theme", value: "light" },
        { label: "Dark theme", value: "dark" },
    ]);

    const [dropDownValue, setDropDownValue] = useState(settings.themeMode);

    return (
        <View style={[styles.screen, { backgroundColor: themeColor.background }]}>

            <View style={[styles.row, { backgroundColor: themeColor.background }]}>
                <Text style={[styles.optionRowLabel, { color: themeColor.text }]}>
                    UserName:
                </Text>
                <TextInput
                    value={settings.username}
                    onChangeText={text => (dispatch({ type: "SET_USERNAME", payload: text }))}
                    placeholder="Please enter your name"
                    style={[styles.option2Choose, styles.username, { borderColor: themeColor.text, color: themeColor.text }]}
                />
            </View>
            <View style={[styles.row, { backgroundColor: themeColor.background }]}>

                <Text style={[styles.optionRowLabel, { color: themeColor.text }]}>
                    Theme
                </Text>

                <View style={styles.option2Choose}>
                    <DropDownPicker
                        open={open}
                        value={dropDownValue}
                        items={items}
                        setOpen={setOpen}
                        setValue={(val) => {
                            const themeValue = typeof val === "function" ? val(dropDownValue) : val;
                            setDropDownValue(themeValue);
                            dispatch({
                                type: "SET_THEME_MODE",
                                payload: themeValue as "system" | "light" | "dark",
                            });
                        }}
                        setItems={setItems}
                        style={[
                            styles.dropdown,
                            open && styles.dropdownActive,
                            {
                                backgroundColor: themeColor.background,
                                borderColor: themeColor.text + "40",
                            },
                        ]}
                        dropDownContainerStyle={[
                            styles.dropdownContainer,
                            {
                                backgroundColor: themeColor.background,
                                borderColor: themeColor.text + "40",
                            },
                        ]}
                        textStyle={{ color: themeColor.text }}
                        arrowIconStyle={{ tintColor: themeColor.text } as any}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 5,
        paddingTop: 10,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 5,
        marginVertical: 3,
    },
    optionRowLabel: {
        fontSize: 18,
        fontWeight: "600",
    },
    option2Choose: {
        width: "45%",
    },
    dropdown: {
        borderWidth: 0,
        backgroundColor: "transparent",
    },
    dropdownActive: {
        borderWidth: 0,
    },
    dropdownContainer: {
        borderWidth: 0,
    },

    // username
    username: {
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2
    }
});
