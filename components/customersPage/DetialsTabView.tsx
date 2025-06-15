import { View, Text, Pressable } from 'react-native'
import { useColorScheme } from 'nativewind';
import { customerType } from '@/constants/customers';
import ListFormOption from '@/components/shared/ListFormOption';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
// import ListOption from '../shared/ListOption';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';

type DetialsTabViewProps = {
    customerDetails: customerType | undefined;
    lstAreas?: { iAreaId: number; sArea: string }[];
    lstManagers?: { iUserAppManagerId: number; sUserAppManager: string }[];
}
const DetialsTabView = ({ customerDetails, lstAreas, lstManagers }: DetialsTabViewProps) => {

    const { colorScheme } = useColorScheme(); // Auto-detect system color scheme

    return (
        <View className='px-3 gap-6 mb-6'>
            <View>
                <Text className=' text-gray-400  text-xs mt-4 mb-[6px] ml-3 '>Customer Details</Text>

                <ListFormOption title='Customer Name' value={customerDetails?.sCustomer} titleMarginLeft={4} className='rounded-tr-lg rounded-tl-lg '  >
                    <MaterialCommunityIcons name="account" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListFormOption>

                <ListFormOption title='Industries' value={customerDetails?.sCustomer} titleMarginLeft={4}  >
                    <Entypo name="suitcase" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListFormOption>

                <ListFormOption title='Country' value={lstAreas?.find((id) => id.iAreaId == customerDetails?.iAreaId)?.sArea} titleMarginLeft={4}  >
                    <MaterialCommunityIcons name="map-marker-radius-outline" size={17} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListFormOption>

                <ListFormOption title='Location' value={customerDetails?.sLocation} titleMarginLeft={4}   >
                    {/* <Feather name="phone" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} /> */}
                    <Ionicons name="locate" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListFormOption>

                <ListFormOption title='Account Manager' value={lstManagers?.find((id) => id.iUserAppManagerId == customerDetails?.iUserAppManagerId)?.sUserAppManager} titleMarginLeft={4}   >
                    {/* <Feather name="phone" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} /> */}
                    <MaterialCommunityIcons name="account-tie" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListFormOption>


                <ListFormOption title='Status' value={customerDetails?.sStatus} titleMarginLeft={4}   >
                    <MaterialCommunityIcons name="account-question" size={18} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListFormOption>

                <ListFormOption title='Category' value={customerDetails?.sCategory} titleMarginLeft={4} className='rounded-br-lg rounded-bl-lg '  >
                    {/* <MaterialCommunityIcons name="account-eye" size={18} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} /> */}
                    <MaterialIcons name="type-specimen" size={18} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListFormOption>
                <ListFormOption title='ERP Customer' value={'[34e3]'} titleMarginLeft={4} className='rounded-br-lg rounded-bl-lg '  >
                    {/* <MaterialCommunityIcons name="account-network-outline" size={18} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'}size={18} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} /> */}
                    <MaterialCommunityIcons name="account-switch-outline" size={18} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListFormOption>

            </View>

            {/* CTA Options */}
            <View>
                <Pressable onPress={() => router.push('customers/contacts/relatedContacts')} className={`bg-slate-200 dark:bg-[#161f2e] border-[#262f3a]  p-4 border-b-[1px] flex-row justify-between gap-4 rounded-tr-lg rounded-tl-lg active:opacity-70`}>
                    <View className='flex-row items-center gap-2'>
                        <MaterialCommunityIcons name="account-multiple" size={20} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                        <View className='flex-row gap-1' style={{ marginLeft: 4 }}>
                            <Text className="text-dark dark:text-light">Related Contacts</Text>
                            <Text className="text-dark dark:text-gray-400 ml-1">( 21 )</Text>
                        </View>
                    </View>
                    <Entypo name="chevron-small-right" size={20} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </Pressable>

                <Pressable onPress={() => router.push('customers/contacts/relatedContacts')} className={`bg-slate-200 dark:bg-[#161f2e] border-[#262f3a]  p-4 border-b-[1px] flex-row justify-between gap-4 rounded-br-lg rounded-bl-lg active:opacity-70`}>
                    <View className='flex-row items-center gap-2'>
                        <MaterialCommunityIcons name="handshake" size={20} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                        <View className='flex-row gap-1 ' style={{ marginLeft: 4 }}>
                            <Text className="text-dark dark:text-light">Related Opps</Text>
                            <Text className="text-dark dark:text-gray-400 ml-1">( 424 )</Text>
                        </View>
                    </View>
                    <Entypo name="chevron-small-right" size={20} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </Pressable>

            </View>
            {/* CTA Options */}

            <View className='my-[6px] flex-row justify-between px-[10px]'>
                <View className='flex-row items-center gap-1 '>
                    <Text className=' text-xs text-gray-500'>Existing Transaction</Text>
                    <AntDesign name="arrowright" size={9} style={{ marginTop: 1 }} color="#6b7280" />
                    <Text className=' text-xs text-gray-500'>0</Text>
                </View>
                <View className='flex-row items-center gap-1 '>
                    <Text className=' text-xs text-gray-500'>Date Created</Text>
                    <AntDesign name="arrowright" size={9} style={{ marginTop: 1 }} color="#6b7280" />
                    <Text className=' text-xs text-gray-500'>20/4/2004</Text>
                </View>
            </View>

        </View >

    )
}

export default DetialsTabView