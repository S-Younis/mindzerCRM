import { View, Text, ScrollView, RefreshControl, Pressable, Platform, Linking, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { lst_customers, lst_customers_areas, lst_customers_users } from "@/constants/customers";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useColorScheme } from 'nativewind';
import DetialsTabView from '@/components/customersPage/DetialsTabView';
import Feather from '@expo/vector-icons/Feather';
import Toast from 'react-native-toast-message';
import * as Clipboard from 'expo-clipboard';
import ListFormOption from '@/components/shared/ListFormOption';
import { Entypo } from '@expo/vector-icons';

const ContactDetails = () => {
    const { colorScheme } = useColorScheme(); // Auto-detect system color scheme

    const { iCustomerId } = useLocalSearchParams();
    const CUSTOMER = lst_customers.find(customer => customer.iCustomerId === parseInt(iCustomerId as string));

    const [refreshing, setRefreshing] = useState(false);
    const [selectedTabIndx, setSelectedTabIndx] = useState(0);

    const [callActionIsLoading, setCallActionIsLoading] = useState(false);
    const [emailActionIsLoading, setEmailActionIsLoading] = useState(false);


    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1200);
    };

    // const handleContactActions = async (type: 'email' | 'phone') => {
    //     if (type === 'email') {
    //         setEmailActionIsLoading(true);
    //         await Linking.openURL(`mailto:${CUSTOMER?.sEmail}`);
    //         setEmailActionIsLoading(false);

    //     } else if (type === 'phone') {
    //         setCallActionIsLoading(true);
    //         if (Platform.OS === 'android') {
    //             await Linking.openURL(`tel:${CUSTOMER?.sPhoneBusiness}`)
    //             setCallActionIsLoading(false);
    //             return;
    //         }
    //         await Linking.openURL(`telprompt:${CUSTOMER?.sPhoneBusiness}`)
    //         setCallActionIsLoading(false);


    //     }
    // }

    // const handleEamilOnClick = async () => {

    //     await Clipboard.setStringAsync(CUSTOMER?.sEmail || '');
    //     Toast.show({
    //         type: 'info',
    //         text1: 'Email Copied',
    //         text2: CUSTOMER?.sEmail || '',
    //         position: 'top',
    //         visibilityTime: 2000,
    //     })
    //     // Linking.openURL(`mailto:${CUSTOMER?.sEmail}`);
    // }


    return (
        <>
            {/* Dynamic Stack Header  */}
            {
                CUSTOMER?.bEdit &&
                <Stack.Screen options={{
                    headerRight: () => <MaterialIcons name="mode-edit-outline" size={20} color="#f8f8f8" onPress={() => router.push(`/customers/editCustomer/${iCustomerId}`)} />,
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

                <View className=' bg-[#161f2e]  p-4 pb-2 px-6 pt-6 flex-row  gap-2  '>
                    <View className=''>
                        <MaterialCommunityIcons name="account" size={32} color="#f8f8f8" />
                    </View>
                    <View className='gap-1'>
                        <Text className='text-light text-xl font-bold pl-[2px] '>{CUSTOMER?.sCustomer}</Text>

                        <View className='flex-row items-center gap-2  mt-2 mr-auto '>
                            <View className='  bg-green-300 p-[4px] px-4  rounded-xl flex items-center justify-center'><Text>{CUSTOMER?.sStatus}</Text></View>
                            <Text className='text-gray-600 mr-1'>|</Text>
                            <View className='flex-row items-center gap-1'>
                                <MaterialCommunityIcons name="map-marker-radius-outline" size={15} color="#f8f8f8" />
                                <Text className='adaptive-text text-sm'>{lst_customers_areas.find((area) => area.iAreaId == CUSTOMER?.iAreaId)?.sArea}</Text>
                            </View>
                        </View>

                    </View>
                </View>

                <View className='py-4 bg-[#161f2e] border-[#262f3a] border-[1px] border-t-0 border-x-none '>
                    <SegmentedControl
                        style={{ width: '90%', marginHorizontal: 'auto', borderRadius: 8 }}
                        values={['Details', 'Comments', 'Attachments', 'History']}
                        fontStyle={{ color: '#f8f8f8', fontSize: 11, fontWeight: '500' }}
                        backgroundColor='#33343E'
                        sliderStyle={{ backgroundColor: '#6A6B75' }}
                        selectedIndex={selectedTabIndx}
                        onChange={(event) => {
                            setSelectedTabIndx(event.nativeEvent.selectedSegmentIndex);
                        }}
                    />
                </View>

                {selectedTabIndx === 0 && (
                    <DetialsTabView customerDetails={CUSTOMER} lstAreas={lst_customers_areas} lstManagers={lst_customers_users} />
                )}

                {selectedTabIndx === 1 && (
                    <View className='px-3  mb-6 '>

                        <View className='flex-row items-center gap-[4px] mt-4 mb-[6px] ml-3'>
                            <MaterialCommunityIcons name="comment-outline" size={10} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                            <Text className=' text-gray-400  text-xs  '>Next Step</Text>
                        </View>

                        <Pressable onPress={() => router.push('customers/nextStepPage')} className='bg-[#161f2e]  flex-row justify-between items-center gap-[2px] w-[100%] p-4 rounded-lg '>
                            <View className='flex-1'>
                                <Text className='adaptive-text'>sadsad asd sad sa das ds a</Text>
                            </View>
                            <Entypo name="chevron-small-right" size={20} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                        </Pressable>

                        <View className='flex-row items-center gap-[4px] mt-6 mb-[6px] ml-3'>
                            <MaterialCommunityIcons name="comment-outline" size={10} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                            <Text className=' text-gray-400  text-xs  '>Comments</Text>
                        </View>
                        <View className='flex items-center justify-center '>
                            <TextInput
                                // onChangeText={onChange}
                                // onBlur={onBlur}
                                value={'CUSTOMER?.s'}
                                placeholder='Add a comment...'
                                readOnly={true}
                                multiline
                                numberOfLines={4}
                                className='bg-[#161f2e] min-h-20  text-light text-sm px-4 pb-[20px] pt-4 rounded-lg border border-gray-800 placeholder:text-gray-400' />
                        </View>

                    </View>
                )}


            </ScrollView>
        </>

    );

}

export default ContactDetails