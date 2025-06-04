import { View, Text, ScrollView, RefreshControl, Pressable, Platform, Linking } from 'react-native'
import { useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { contacts_lst } from "@/constants/contacts";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useColorScheme } from 'nativewind';
import DetialsTabView from '@/components/contactsPage/DetialsTabView';
import Feather from '@expo/vector-icons/Feather';

const ContactDetails = () => {
    // const { colorScheme } = useColorScheme(); // Auto-detect system color scheme

    const { iContactId } = useLocalSearchParams();
    const USER = contacts_lst.find(contact => contact.iContactId === parseInt(iContactId as string));

    const [refreshing, setRefreshing] = useState(false);
    const [selectedTabIndx, setSelectedTabIndx] = useState(0);


    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1200);
    };

    const handleContactActions = (type: 'email' | 'phone') => {
        if (type === 'email') {
            Linking.openURL(`mailto:${USER?.sEmail}`);
        } else if (type === 'phone') {
            if (Platform.OS === 'android') {
                Linking.openURL(`tel:${USER?.sPhoneBusiness}`)
                return;
            }
            Linking.openURL(`telprompt:${USER?.sPhoneBusiness}`)
        }
    }


    return (
        <>
            {/* Dynamic Stack Header  */}
            {
                USER?.bEdit &&
                <Stack.Screen options={{
                    headerRight: () => <MaterialIcons name="mode-edit-outline" size={20} color="#f8f8f8" onPress={() => router.push(`/contacts/editContact/${iContactId}`)} />,
                }} />
            }
            <ScrollView
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[1]}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                className='h-full '>

                <View className=' bg-[#161f2e]  p-4 pb-3 px-6 pt-6 flex-row  gap-2  '>
                    <View className=''>
                        <MaterialCommunityIcons name="account" size={32} color="#f8f8f8" />
                    </View>
                    <View className='gap-1'>
                        <Text className='text-light text-xl font-bold pl-[2px] '>{USER?.sFullName}</Text>
                        <View className='flex-row items-center gap-3 '>
                            <Text className='text-blue-400 text-sm  '> {USER?.sEmail}</Text>
                            <MaterialCommunityIcons name="content-copy" size={12} color="#f8f8f8" />
                        </View>
                        <View className='flex-row items-center gap-2  mt-2 mr-auto '>
                            <View className='  bg-green-300 p-[2px] px-4  rounded-xl flex items-center justify-center'><Text >{USER?.sActive ? 'Active' : 'Inactive'}</Text></View>
                            <Text className='text-white '>.</Text>
                            <Pressable onPress={() => handleContactActions('phone')} className=' bg-gray-400 p-[3px] px-[6px]  rounded-xl flex items-center justify-center'>
                                <Feather name="phone" size={16} color={'black'} />
                            </Pressable>
                            <Pressable onPress={() => handleContactActions('email')} className=' bg-gray-400 p-[3px] px-[6px]  rounded-xl flex items-center justify-center'>
                                <Feather name="mail" size={16} color="black" />
                            </Pressable>
                        </View>

                    </View>
                </View>

                <View className='py-4 bg-[#161f2e] border-[#262f3a] border-[1px] border-t-0 border-x-none '>
                    <SegmentedControl
                        style={{ width: '70%', marginHorizontal: 'auto', borderRadius: 8 }}
                        values={['Details', 'Comments']}
                        fontStyle={{ color: '#f8f8f8', fontSize: 12, fontWeight: '500' }}
                        backgroundColor='#33343E'
                        sliderStyle={{ backgroundColor: '#6A6B75' }}
                        selectedIndex={selectedTabIndx}
                        onChange={(event) => {
                            setSelectedTabIndx(event.nativeEvent.selectedSegmentIndex);
                        }}
                    />
                </View>

                {selectedTabIndx === 0 && (
                    <DetialsTabView contactDetials={USER} />
                )}

                {selectedTabIndx === 1 && (
                    <View>
                        <Text className=' text-gray-300 text-xs mb-2 ml-4 '>Comments</Text>
                        <View className='h-[1000px] bg-gray-200 dark:bg-slate-300 flex items-center justify-center '>
                            <Text className='text-dark dark:text-light text-2xl font-bold text-center mt-4'>Contact 2222222</Text>
                        </View>
                    </View>
                )}


            </ScrollView>
        </>

    );

}

export default ContactDetails