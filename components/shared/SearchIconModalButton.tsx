import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';


const SearchIconModalButton = ({ ...props }: TouchableOpacityProps) => {
    // const [isPressed, setIsPressed] = useState(false);

    return (
        <TouchableOpacity
            onPress={props.onPress}
        // onPressIn={() => setIsPressed(true)}
        // onPressOut={() => setIsPressed(false)}
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