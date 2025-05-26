import React, { useState, useRef } from 'react';
import { Animated, TouchableOpacity, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

interface SimpleThemeToggleProps {
    className?: string;
    iconsSize?: number;
}
const SimpleThemeToggle = ({ className, iconsSize = 24 }: SimpleThemeToggleProps) => {
    const { colorScheme, toggleColorScheme } = useColorScheme();

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

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-360deg']
    });

    return (
        <TouchableOpacity onPress={toggleTheme} className={`${className}`}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
                {isDarkMode ? (
                    <Ionicons name="moon" size={iconsSize - 1} color="#1c3db8" />
                ) : (
                    <Ionicons name="sunny" size={iconsSize + 1} color="white" />
                )}
            </Animated.View>
        </TouchableOpacity>
    );
};



export default SimpleThemeToggle;