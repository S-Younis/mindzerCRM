import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerActions, type ParamListBase } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native';

type DrawerToggleProps = {
  hasMargins?: Boolean;
};
export const DrawerToggle = ({ hasMargins }: DrawerToggleProps) => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
      <MaterialCommunityIcons className={`${hasMargins && 'ml-[16px] mb-2'} `} name="sort-variant" size={24} color="#fafafa" />
    </TouchableOpacity>
  );
};
