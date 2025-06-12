import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native'
import { useRef, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { lst_customers, lst_customers_areas, lst_customers_users } from "@/constants/customers";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useColorScheme } from 'nativewind';
import DetialsTabView from '@/components/customersPage/DetialsTabView';
import { Feather } from '@expo/vector-icons';
import CustomerCommentsTabView from '@/components/customersPage/CustomerCommentsTabView';
import { myLightTheme } from '@/configs/theme';
import CommentsBottomSheet from '@/components/customersPage/CommentsBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';

const ContactDetails = () => {
    const { colorScheme } = useColorScheme(); // Auto-detect system color scheme
    const bottomSheetRef = useRef<BottomSheet>(null);

    const { iCustomerId } = useLocalSearchParams();
    const CUSTOMER = lst_customers.find(customer => customer.iCustomerId === parseInt(iCustomerId as string));

    const [refreshing, setRefreshing] = useState(false);
    const [selectedTabIndx, setSelectedTabIndx] = useState(0);


    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1200);
    };

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

                <View className='py-4 bg-[#161f2e] border-[#262f3a] border-[1px] border-t-0 border-x-none  '>
                    <SegmentedControl
                        style={{ width: '90%', marginHorizontal: 'auto', borderRadius: 8 }}
                        values={['Details', 'Comments', 'History']}
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
                    <CustomerCommentsTabView />
                )}

            </ScrollView>

            {/* Floating Action Button */}
            {selectedTabIndx === 1 && (
                <TouchableOpacity
                    className="shadow-md"
                    style={{
                        position: 'absolute',
                        bottom: 20,
                        right: 24,
                        backgroundColor: myLightTheme.colors.primary,
                        width: 56,
                        height: 56,
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        elevation: 5, // For Android shadow

                    }}
                    onPress={() =>
                        bottomSheetRef.current?.expand()
                    }
                >
                    <Feather name="plus" size={24} color="white" />
                </TouchableOpacity>
            )}

            {/* Bottom Sheet for Add Customer */}
            <CommentsBottomSheet ref={bottomSheetRef} />
        </>



    );

}

export default ContactDetails