import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerActions, type ParamListBase } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

type DrawerToggleProps = {
    hasMargins?: Boolean;
}
export const DrawerToggle = ({ hasMargins }: DrawerToggleProps) => {
    const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

    return <MaterialCommunityIcons className={`${hasMargins && 'ml-[16px] mb-2'} `} name="sort-variant" size={24} color="#fafafa" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />

}
