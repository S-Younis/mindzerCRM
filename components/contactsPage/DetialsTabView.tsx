import { View, Text } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/build/FontAwesome6';
import { useColorScheme } from 'nativewind';
import { contactType } from '@/constants/contacts';
import ListFormOption from '@/components/shared/ListFormOption';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

type DetialsTabViewProps = {
  contactDetials: contactType | undefined;
  lstAreas?: { iAreaId: number; sArea: string }[];
};
const DetialsTabView = ({ contactDetials, lstAreas }: DetialsTabViewProps) => {
  const { colorScheme } = useColorScheme(); // Auto-detect system color scheme

  return (
    <View className="px-4 gap-4 mb-6">
      <View className="">
        <Text className=" text-gray-500 dark:text-gray-400  text-sm mt-4 mb-[6px] ml-3 ">Personal Details</Text>

        <ListFormOption title="Company" value={contactDetials?.sCompany} titleMarginLeft={4} className="rounded-tr-lg rounded-tl-lg ">
          <FontAwesome6 name="building-user" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
        </ListFormOption>

        <ListFormOption title="Job Title" value={contactDetials?.sJobTitle} titleMarginLeft={4}>
          <Entypo name="suitcase" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
        </ListFormOption>

        <ListFormOption title="Email" value={contactDetials?.sEmail} titleMarginLeft={4}>
          <MaterialIcons name="alternate-email" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
        </ListFormOption>

        <ListFormOption title="Bussiness Phone" value={contactDetials?.sPhoneBusiness} titleMarginLeft={4}>
          <Feather name="phone" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
        </ListFormOption>

        <ListFormOption title="Mobile Phone" value={contactDetials?.sPhoneMobile} titleMarginLeft={4}>
          <Feather name="phone" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
        </ListFormOption>

        <ListFormOption title="Status" value={contactDetials?.sActive ? 'Active' : 'Inactive'} titleMarginLeft={4}>
          <MaterialCommunityIcons name="account-question" size={18} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
        </ListFormOption>

        <ListFormOption
          title="Private ( Limited Visibiliy )"
          value={contactDetials?.bPrivate ? 'Yes' : 'No'}
          titleMarginLeft={4}
          className="rounded-br-lg rounded-bl-lg ">
          <MaterialCommunityIcons name="account-eye" size={18} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
        </ListFormOption>
      </View>
      {/* Address Section */}
      <View>
        <Text className=" text-gray-500 dark:text-gray-400 text-sm mt-2 mb-[6px] ml-3 ">Address</Text>

        <ListFormOption
          title="Country"
          value={lstAreas?.find(id => id.iAreaId == contactDetials?.sArea)?.sArea}
          titleMarginLeft={4}
          className="rounded-tr-lg rounded-tl-lg ">
          <Ionicons name="location-sharp" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
        </ListFormOption>

        <ListFormOption title="City" value={contactDetials?.sCity} titleMarginLeft={4}>
          <MaterialCommunityIcons name="home-city-outline" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
        </ListFormOption>

        <ListFormOption title="Full Address" value={contactDetials?.sAddress} titleMarginLeft={4} className="rounded-br-lg rounded-bl-lg min-h-16 ">
          <Entypo name="address" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
        </ListFormOption>
      </View>

      <View style={{ marginTop: 10 }} className=" mb-2 flex-row items-center justify-center gap-1 ">
        <Text className=" text-xs text-center text-gray-500">Last Updated</Text>
        <AntDesign name="arrowright" size={9} style={{ marginTop: 1 }} color="#6b7280" />
        <Text className=" text-xs text-gray-500">
          {new Date().getMonth()}/{new Date().getFullYear()}
        </Text>
      </View>
    </View>
  );
};

export default DetialsTabView;
