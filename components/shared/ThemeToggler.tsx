import React, { useState, useRef } from 'react';
import { Animated, TouchableOpacity, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { usePrefStore } from '@/stores/pref.store';
import { ThemeType } from '@/types/themeTypes';

interface LoginThemeToggleProps {
    className?: string;
    iconsSize?: number;
}
export const LoginThemeToggle = ({ className, iconsSize = 24 }: LoginThemeToggleProps) => {
    const { colorScheme, toggleColorScheme, setColorScheme } = useColorScheme();
    const setTheme = usePrefStore((state) => state.setTheme)

    const [isDarkMode, setIsDarkMode] = useState(!(colorScheme == 'dark'));
    const spinValue = useRef(new Animated.Value(0)).current;


    
    const toggleTheme = () => {
        Animated.timing(spinValue, {
            toValue: isDarkMode ? 0 : 1,
            duration: 400,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
        setIsDarkMode(!isDarkMode);
        toggleColorScheme();
    };

    const handleOptionPress = (theme: ThemeType) => {
        if (colorScheme == theme) return; // No change if the selected theme is already active 
        if (theme) {
            setColorScheme(theme);
            setTheme(theme);
        }
    }

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-360deg']
    });

    return (
        <TouchableOpacity onPress={toggleTheme} className={`${className}`}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
                {isDarkMode ? (
                    <Ionicons name="moon" size={iconsSize - 1} color="#003299" />
                ) : (
                    <Ionicons name="sunny" size={iconsSize + 1} color="#DBDBDB" />
                )}
            </Animated.View>
        </TouchableOpacity>
    );
};


