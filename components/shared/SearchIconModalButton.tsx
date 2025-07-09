import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

const SearchIconModalButton = ({ ...props }: TouchableOpacityProps) => {
  return (
    <TouchableOpacity {...props} activeOpacity={0.6}>
      <MaterialCommunityIcons name="magnify" size={24} color={'#ffff'} />
    </TouchableOpacity>
  );
};

export default SearchIconModalButton;
