import { View, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

interface ActivityCardProps {
  title: string;
  subTitle?: string;
  status: 'Completed' | 'Pending' | 'In Progress';
  date?: string;
}
const ActivityCard = ({ title, subTitle, status, date }: ActivityCardProps) => {
  return (
    <View className="flex-row rounded-xl items-start p-4 bg-gray-100  border-blue-800/15 dark:bg-[#161f2e] dark:border-[#262f3a] border ">
      <View className="mr-3 mt-[2px]">
        <AntDesign name="checkcircleo" size={18} color="#22c55e" />
      </View>
      <View className="flex-1">
        <Text className="text-dark dark:text-light text-base font-medium mb-1">{title}</Text>
        <Text className="text-gray-500 dark:text-gray-400 text-sm mb-2">{subTitle}</Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-xs font-semibold text-green-500">{status}</Text>
          <Text className="text-gray-500/70 dark:text-gray-300/65 text-xs">Due: {date}</Text>
        </View>
      </View>
    </View>
  );
};

export default ActivityCard;
