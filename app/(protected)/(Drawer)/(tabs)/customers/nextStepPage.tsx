import { View, Text } from 'react-native'
import { router, Stack } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MindzerButton from '@/components/shared/MindzerButton';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const nextStepPage = () => {

    const [isEditing, setIsEditing] = useState(false);

    const hanldeStepDoneBTN = () => {
        console.log('Step marked as done');
    }
    const hanldeSaveStepBTN = () => {
        console.log('Step changes saved');
        setIsEditing(false);
    }

    return (
        <>
            {
                true &&
                <Stack.Screen options={{
                    headerLeft: () => <Text onPress={() => router.back()} className='text-blue-600  dark:text-blue-400 text-[16px] '>Cancel</Text>,
                    headerRight: () => isEditing ? <Text onPress={hanldeSaveStepBTN} className='text-blue-600  dark:text-blue-400 text-[16px] mr-2 '>Save</Text> : <MaterialIcons name="mode-edit-outline" size={20} color="#f8f8f8" onPress={() => setIsEditing(true)} />,
                }} />
            }
            <SafeAreaView className='pt-4 flex-1  ' >
                <View className=' pb-3 px-4  flex-row justify-between gap-[14px] items-center   border-t-0 border-x-0 border-b-2 border-gray-900 ' >
                    <Text className='adaptive-text'>d ipsum dolor sit amet consectetur adipisicing elit. Perferendis, corrupti aspernatur minus impedit, explicabo quod esse itaque animi temporibus nulla reiciendis voluptates quidem praesentium, quam id excepturi consequatur omnis ducimus.</Text>
                </View>
                <MindzerButton isTitleCentered variants='success' className='mt-auto mb-8' onPress={hanldeStepDoneBTN} >
                    <Text className={`font-medium  text-light`}>
                        Mark as Done
                    </Text>
                </MindzerButton>

            </SafeAreaView>
        </>
    )
}

export default nextStepPage