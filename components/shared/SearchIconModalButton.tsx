import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

const SearchIconModalButton = ({ ...props }: TouchableOpacityProps) => {
    const [isPressed, setIsPressed] = useState(false);
    return (
        <TouchableOpacity
            onPress={props.onPress}
            className={`${isPressed && 'opacity-80'}`}
            onPressIn={() => setIsPressed(true)}
        >
            <MaterialCommunityIcons
                name="magnify"
                size={24}
                color={'#fafafa'}
            />
        </TouchableOpacity>
    );
};


export default SearchIconModalButton;