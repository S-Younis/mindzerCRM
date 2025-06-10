import { View, Text } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/build/FontAwesome6';
import { useColorScheme } from 'nativewind';
import { contactType } from '@/constants/contacts';
import ListFormOption from '@/components/shared/ListFormOption';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

type DetialsTabViewProps = {
    contactDetials: contactType | undefined;
}
const DetialsTabView = ({ contactDetials }: DetialsTabViewProps) => {

    const { colorScheme } = useColorScheme(); // Auto-detect system color scheme

    return (
        <View className='px-3 gap-4 mb-6'>
            <View>
                <Text className=' text-gray-400  text-xs mt-4 mb-[6px] ml-3 '>Personal Details</Text>

                <ListFormOption title='Company' value={contactDetials?.sCompany} titleMarginLeft={4} className='rounded-tr-lg rounded-tl-lg '  >
                    <FontAwesome6 name="building-user" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListFormOption>

                <ListFormOption title='Job Title' value={contactDetials?.sJobTitle} titleMarginLeft={4}  >
                    <Entypo name="suitcase" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListFormOption>

                <ListFormOption title='Email' value={contactDetials?.sEmail} titleMarginLeft={4}  >
                    <MaterialIcons name="alternate-email" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListFormOption>

                <ListFormOption title='Bussiness Phone' value={contactDetials?.sPhoneBusiness} titleMarginLeft={4}   >
                    <Feather name="phone" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListFormOption>

                <ListFormOption title='Mobile Phone' value={contactDetials?.sPhoneMobile} titleMarginLeft={4}   >
                    <Feather name="phone" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListFormOption>


                <ListFormOption title='Status' value={contactDetials?.sActive ? 'Active' : 'Inactive'} titleMarginLeft={4}   >
                    <MaterialCommunityIcons name="account-question" size={18} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListFormOption>

                <ListFormOption title='Private ( Limited Visibiliy )' value={contactDetials?.bPrivate ? 'Yes' : 'No'} titleMarginLeft={4} className='rounded-br-lg rounded-bl-lg '  >
                    <MaterialCommunityIcons name="account-eye" size={18} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListFormOption>

            </View>
            {/* Address Section */}
            <View>
                <Text className=' text-gray-400 text-xs mt-2 mb-[6px] ml-3 '>Address</Text>

                <ListFormOption title='Country' value={contactDetials?.sArea} titleMarginLeft={4} className='rounded-tr-lg rounded-tl-lg '  >
                    <Ionicons name="location-sharp" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListFormOption>

                <ListFormOption title='City' value={contactDetials?.sCity} titleMarginLeft={4}  >
                    <MaterialCommunityIcons name="home-city-outline" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListFormOption>


                <ListFormOption title='Full Address' value={contactDetials?.sAddress} titleMarginLeft={4} className='rounded-br-lg rounded-bl-lg min-h-16 '  >
                    <Entypo name="address" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
                </ListFormOption>

            </View>

            <Text className='mt-4 mb-2 text-sm text-center text-gray-400'> Last Updated on {new Date().getMonth()}/{new Date().getFullYear()}</Text>
        </View>

    )
}

export default DetialsTabView