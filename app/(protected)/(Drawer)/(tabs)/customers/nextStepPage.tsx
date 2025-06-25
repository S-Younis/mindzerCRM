import { View, Text } from 'react-native';
import { router, Stack } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MindzerButton from '@/components/shared/MindzerButton';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const nextStepPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const hanldeStepDoneBTN = () => {
    console.log('Step marked as done');
  };
  const hanldeSaveStepBTN = () => {
    console.log('Step changes saved');
    setIsEditing(false);
  };

  const { bottom } = useSafeAreaInsets();
  return (
    <>
      {true && (
        <Stack.Screen
          options={{
            headerLeft: () => (
              <Text onPress={() => router.back()} className="text-blue-600  dark:text-blue-400 text-[16px] ">
                Cancel
              </Text>
            ),
            headerRight: () => (isEditing ? null : <MaterialIcons name="mode-edit-outline" size={20} color="#f8f8f8" onPress={() => setIsEditing(true)} />),
          }}
        />
      )}
      <View className="pt-4 flex-1  ">
        <View className="mt-4 pb-3 px-4  flex-row justify-between gap-[14px] items-center   border-t-0 border-x-0 border-b-2 border-gray-900 ">
          <Text className="adaptive-text">
            d ipsum dolor sit amet consectetur adipisicing elit. Perferendis, corrupti aspernatur minus impedit, explicabo quod esse itaque animi temporibus
            nulla reiciendis voluptates quidem praesentium, quam id excepturi consequatur omnis ducimus.
          </Text>
        </View>
        <View className="justify-end gap-4 px-4 mt-auto  ">
          {isEditing && (
            <MindzerButton onPress={hanldeSaveStepBTN} isTitleCentered variants="primary">
              <Text className={`font-medium  text-light`}>Save Changes</Text>
            </MindzerButton>
          )}
          <MindzerButton isTitleCentered variants="success" style={{ marginBottom: bottom }} onPress={hanldeStepDoneBTN}>
            <Text className={`font-medium  text-light`}>Mark as Done</Text>
          </MindzerButton>
        </View>
      </View>
    </>
  );
};

export default nextStepPage;
