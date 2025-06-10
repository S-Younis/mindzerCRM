import { View, Text } from 'react-native'
import { useColorScheme } from 'nativewind';
import { customerType } from '@/constants/customers';
import ListFormOption from '@/components/shared/ListFormOption';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ListOption from '../shared/ListOption';

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
                    <Feather name="phone" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListFormOption>

                <ListFormOption title='Account Manager' value={lstManagers?.find((id) => id.iUserAppManagerId == customerDetails?.iUserAppManagerId)?.sUserAppManager} titleMarginLeft={4}   >
                    <Feather name="phone" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListFormOption>


                <ListFormOption title='Status' value={customerDetails?.sStatus} titleMarginLeft={4}   >
                    <MaterialCommunityIcons name="account-question" size={18} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListFormOption>

                <ListFormOption title='Category' value={customerDetails?.sCategory} titleMarginLeft={4} className='rounded-br-lg rounded-bl-lg '  >
                    <MaterialCommunityIcons name="account-eye" size={18} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListFormOption>
                <ListFormOption title='ERP Customer' value={'[34e3]'} titleMarginLeft={4} className='rounded-br-lg rounded-bl-lg '  >
                    <MaterialCommunityIcons name="account-eye" size={18} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListFormOption>

            </View>


            <View>
                <ListOption title='Related Contacts' titleMarginLeft={4} className='rounded-tr-lg rounded-tl-lg'  >
                    <MaterialCommunityIcons name="account-multiple" size={20} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListOption>
                <ListOption title='Related Opps' titleMarginLeft={4} className='rounded-br-lg rounded-bl-lg'  >
                    <MaterialCommunityIcons name="handshake" size={20} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListOption>
            </View>

            <View className='my-[6px] flex-row justify-between px-[10px]'>
                <Text className=' text-sm text-gray-400'>Existing Transaction : 0</Text>
                <Text className=' text-sm text-gray-400'>Date Created : 20/4/2004</Text>
            </View>

        </View >

    )
}

export default DetialsTabView