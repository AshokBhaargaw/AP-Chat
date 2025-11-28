import { createContext, useContext, useReducer, ReactNode, useEffect, useState, } from "react";
import { Appearance } from "react-native";

export type Theme = {
    primary: string;
    background: string;
    text: string;
};

const lightTheme: Theme = {
    primary: "#4F46E5",
    background: "#FFFFFF",
    text: "#000000",
};

const darkTheme: Theme = {
    primary: "#818CF8",
    background: "#000000",
    text: "#FFFFFF",
};

export type ThemeMode = "system" | "light" | "dark";

export type Settings = {
    darkMode: boolean;
    notifications: boolean;
    language: string;
    username: string;
    themeMode: ThemeMode;
};

export type SettingsAction =
    | { type: "TOGGLE_NOTIFICATIONS" }
    | { type: "SET_LANGUAGE"; payload: string }
    | { type: "SET_USERNAME"; payload: string }
    | { type: "SET_THEME_MODE"; payload: ThemeMode }
    | { type: "RESET" };

const initialSettings: Settings = {
    darkMode: false,
    notifications: true,
    language: "en",
    username: "Guest",
    themeMode: "system",
};

function settingsReducer(state: Settings, action: SettingsAction): Settings {
    switch (action.type) {
        case "TOGGLE_NOTIFICATIONS":
            return { ...state, notifications: !state.notifications };

        case "SET_LANGUAGE":
            return { ...state, language: action.payload };

        case "SET_USERNAME":
            return { ...state, username: action.payload };

        case "SET_THEME_MODE":
            return { ...state, themeMode: action.payload };

        case "RESET":
            return initialSettings;

        default:
            return state;
    }
}

function getThemeFromSettings(mode: ThemeMode): Theme {
    const systemColor = Appearance.getColorScheme();
    const isDark = mode === "dark" || (mode === "system" && systemColor === "dark");
    return isDark ? darkTheme : lightTheme;
}

export type SettingsContextType = {
    settings: Settings;
    themeColor: Theme;
    dispatch: React.Dispatch<SettingsAction>;
};

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, dispatch] = useReducer(settingsReducer, initialSettings);
    const [systemTheme, setSystemTheme] = useState(Appearance.getColorScheme());

    useEffect(() => {
        const sub = Appearance.addChangeListener((preferences) => {
            setSystemTheme(preferences.colorScheme);
        });

        return () => sub.remove();
    }, []);
    
    const themeColor = getThemeFromSettings(settings.themeMode);

    return (
        <SettingsContext.Provider value={{ settings, themeColor, dispatch }}>
            {children}
        </SettingsContext.Provider>
    );
}


export const useSettings = () => {
    const ctx = useContext(SettingsContext);
    if (!ctx)
        throw new Error("useSettings must be used inside SettingsProvider");
    return ctx;
};
