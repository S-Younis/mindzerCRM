import { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

export default function App() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView className="flex-1 ">
      <View className="flex-1 mt-[68px] ">
        <View className="bg-[#303e5f] border-[#262f3a] p-6 border-2 flex-row gap-4  w-[92%] ml-auto mr-auto h-28 rounded-xl">
          <View className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center">
            <Text className="text-black font-bold text-xl ">YM</Text>
          </View>
          <View className="flex self-center gap-[2px] ">
            <Text className="text-black dark:text-white font-bold ">Younis Mohammeed </Text>
            <Text className="text-black dark:text-white font-bold ">
              <Text className="text-gray-200">Division ➡️</Text> Reda Chemicals{' '}
            </Text>
          </View>

          <View className="flex-1 items-end justify-center ">
            <Entypo name="chevron-small-right" size={32} color="white" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
