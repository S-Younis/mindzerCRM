import { View, Text, ScrollView, RefreshControl } from 'react-native'
import { useLayoutEffect, useState } from 'react'
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { contacts_lst } from "@/constants/contacts";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useColorScheme } from 'nativewind';
import DetialsTabView from '@/components/contactsPage/DetialsTabView';

const ContactDetails = () => {
    const { colorScheme } = useColorScheme(); // Auto-detect system color scheme

    const { iContactId } = useLocalSearchParams();
    const USER = contacts_lst.find(contact => contact.iContactId === parseInt(iContactId as string));

    const [refreshing, setRefreshing] = useState(false);
    const [selectedTabIndx, setSelectedTabIndx] = useState(0);

    // Top Edit Icon
    const { setOptions } = useNavigation();
    useLayoutEffect(() => {
        if (USER?.bEdit) {
            setOptions({
                headerRight: () => <MaterialIcons name="mode-edit-outline" size={18} color="#f8f8f8" onPress={() => router.push(`/contacts/editContact/${iContactId}`)} />,
            });
        }
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1200);
    };

    return (
        <ScrollView
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[1]}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            className='h-full '>
            <View className=' bg-[#161f2e]  p-4 px-6 pt-6   flex-row  gap-2  '>
                <View className=''>
                    <MaterialCommunityIcons name="account" size={32} color="#f8f8f8" />
                </View>
                <View className='gap-1'>
                    <Text className='text-light text-xl font-bold pl-[2px] '>{USER?.sFullName}</Text>
                    <View className='flex-row items-center gap-3 '>
                        <Text className='text-blue-400 text-sm  '> {USER?.sEmail}</Text>
                        <MaterialCommunityIcons name="content-copy" size={12} color="#f8f8f8" />
                    </View>
                    <View className=' mr-auto mt-2 bg-green-300 p-[1px] px-3  rounded-xl flex items-center justify-center'><Text className='text-sm'>{USER?.sActive ? 'Active' : 'Inactive'}</Text></View>

                </View>
            </View>

            <View className='pt-2 pb-4  bg-[#161f2e] border-[#262f3a] border-[1px] border-t-0 border-x-none '>
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
    );

}

export default ContactDetails