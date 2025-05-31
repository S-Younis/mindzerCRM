import { View, Text, ScrollView, Animated, Pressable } from 'react-native'
import React, { useRef } from 'react'
import { useLocalSearchParams } from 'expo-router';
import MindzerButton from '@/components/shared/MindzerButton';
const ContactDetails = () => {
    const { iContactId } = useLocalSearchParams();

    const moveX = useRef(new Animated.Value(0)).current;
    const TAB_WIDTH = 96;

    const [tab, setTab] = React.useState(1);
    const toMoveAmmount = TAB_WIDTH * (tab);
    return (
        <ScrollView
            scrollEventThrottle={16}
            stickyHeaderIndices={[1]}
            // onScroll={Animated.event(
            //     [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            //     { useNativeDriver: true }
            // )}
            className='h-full'>

            <View className='h-[100px] bg-gray-100 dark:bg-red-800 flex items-center justify-center '>
                <Text className='text-light text-2xl font-bold text-center mt-4'>Contact Details</Text>
                <Text className='text-light text-lg text-center mt-2'>Contact ID: {iContactId}</Text>
                <MindzerButton variants={'danger'} onPress={() => {
                    // Animated.timing(moveX, {
                    //     toValue: 0,
                    //     duration: 300,
                    //     useNativeDriver: true
                    // }).start();

                    moveX.setValue(96 * 2);
                    // setTab(2);



                }}>
                    <Text className='text-light'>Edit Contact</Text>
                </MindzerButton>
            </View>

            <View className='h-[50px] bg-gray-100 dark:bg-[#161f2e]  flex items-center justify-center '>
                <View className='flex-row gap-1 p-[3px] px-[4px] bg-gray-700   rounded-lg'>
                    <Animated.View className='h-10 w-24 flex items-center justify-center bg-gray-500 rounded-lg'><Text className='text-light'>Tab1</Text></Animated.View>
                    <Animated.View className='h-10 w-24 flex items-center justify-center bg-gray-500 rounded-lg'><Text className='text-light'>Tab2</Text></Animated.View>
                    <Animated.View style={{
                        transform: [{
                            translateX: moveX.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, TAB_WIDTH]
                            })
                        }]
                    }} className='h-10 w-24 flex items-center justify-center  rounded-lg'>

                    </Animated.View>
                </View>
            </View>

            <Text className='text-dark dark:text-light text-xs  '>Section</Text>
            <View className='h-[1000px] bg-gray-200 dark:bg-red-200 flex items-center justify-center '>
                <Text className='text-dark dark:text-light text-2xl font-bold text-center mt-4'>Contact ID: {iContactId}</Text>
            </View>

        </ScrollView>
    );

}

export default ContactDetails