import { View, Text, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useColorScheme } from 'nativewind';
import { PressableProps } from 'react-native';

interface ListOptionSectionProps extends PressableProps {
  title: string;
  hasTag?: boolean;
  tagContent?: string | number;
  icon?: React.JSX.Element;
}
const ListOptionSection = ({ title, hasTag, tagContent, icon, ...props }: ListOptionSectionProps) => {
  const { colorScheme } = useColorScheme(); // Auto-detect system color scheme

  return (
    <Pressable
      {...props}
      className={`bg-slate-200 dark:bg-[#161f2e] border-[#262f3a]  p-4 border-b-0 flex-row justify-between gap-4 rounded-lg rounded-tl-lg active:opacity-70`}>
      <View className="flex-row items-center gap-2">
        {icon}
        <View className="flex-row gap-1" style={{ marginLeft: 4 }}>
          <Text className="text-dark dark:text-light">{title}</Text>
          {hasTag && <Text className="text-dark dark:text-gray-400 ml-1">( {tagContent || 'Content'} )</Text>}
        </View>
      </View>
      <Entypo name="chevron-small-right" size={20} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
    </Pressable>
  );
};

export default ListOptionSection;
