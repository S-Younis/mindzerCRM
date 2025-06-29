import { View, Text } from 'react-native';
import { useColorScheme } from 'nativewind';
import { customerType } from '@/constants/customers';
import ListFormOption from '@/components/shared/ListFormOption';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import ListOptionSection from '../shared/ListOptionSection';

type DetialsTabViewProps = {
  customerDetails: customerType | undefined;
  lstAreas?: { iAreaId: number; sArea: string }[];
  lstManagers?: { iUserAppManagerId: number; sUserAppManager: string }[];
};
const DetialsTabView = ({ customerDetails, lstAreas, lstManagers }: DetialsTabViewProps) => {
  const { colorScheme } = useColorScheme(); // Auto-detect system color scheme

  return (
    <View className="px-4 gap-6 mb-6">
      <View>
        <Text className=" text-gray-400  text-xs mt-4 mb-[6px] ml-3 ">Customer Details</Text>

        <ListFormOption title="Customer Name" value={customerDetails?.sCustomer} titleMarginLeft={4} className="rounded-tr-lg rounded-tl-lg ">
          <MaterialCommunityIcons name="account" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
        </ListFormOption>

        <ListFormOption title="Industries" value={customerDetails?.sCustomer} titleMarginLeft={4}>
          <Entypo name="suitcase" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
        </ListFormOption>

        <ListFormOption title="Country" value={lstAreas?.find(id => id.iAreaId == customerDetails?.iAreaId)?.sArea} titleMarginLeft={4}>
          <MaterialCommunityIcons name="map-marker-radius-outline" size={17} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
        </ListFormOption>

        <ListFormOption title="Location" value={customerDetails?.sLocation} titleMarginLeft={4}>
          {/* <Feather name="phone" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} /> */}
          <Ionicons name="locate" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
        </ListFormOption>

        <ListFormOption
          title="Account Manager"
          value={lstManagers?.find(id => id.iUserAppManagerId == customerDetails?.iUserAppManagerId)?.sUserAppManager}
          titleMarginLeft={4}>
          <MaterialCommunityIcons name="account-tie" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
        </ListFormOption>

        <ListFormOption title="Status" value={customerDetails?.sStatus} titleMarginLeft={4}>
          <MaterialCommunityIcons name="account-question" size={18} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
        </ListFormOption>

        <ListFormOption title="Category" value={customerDetails?.sCategory} titleMarginLeft={4}>
          <MaterialIcons name="type-specimen" size={18} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
        </ListFormOption>
        <ListFormOption title="ERP Customer" value={'[34e3]'} titleMarginLeft={4} className="rounded-br-lg rounded-bl-lg ">
          <MaterialCommunityIcons name="account-switch-outline" size={18} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
        </ListFormOption>
      </View>

      {/* CTA Options */}
      <View>
        <ListOptionSection
          title="Related Contacts"
          hasTag
          tagContent={21}
          className="rounded-tr-lg rounded-tl-lg"
          icon={<MaterialCommunityIcons name="account-multiple" size={20} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />}
          onPress={() => router.push('customers/contacts/relatedContacts')}
        />
        <ListOptionSection
          title="Related Opps"
          hasTag
          tagContent={424}
          className="rounded-br-lg rounded-bl-lg border-b-0"
          icon={<MaterialCommunityIcons name="handshake" size={20} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />}
          onPress={() => router.push('customers/opps/relatedOpps')}
        />
      </View>
      {/* CTA Options */}

      <View className="my-[6px] flex-row justify-between px-[10px]">
        <View className="flex-row items-center gap-1 ">
          <Text className=" text-xs text-gray-500">Existing Transaction</Text>
          <AntDesign name="arrowright" size={9} style={{ marginTop: 1 }} color="#6b7280" />
          <Text className=" text-xs text-gray-500">0</Text>
        </View>
        <View className="flex-row items-center gap-1 ">
          <Text className=" text-xs text-gray-500">Date Created</Text>
          <AntDesign name="arrowright" size={9} style={{ marginTop: 1 }} color="#6b7280" />
          <Text className=" text-xs text-gray-500">20/4/2004</Text>
        </View>
      </View>
    </View>
  );
};

export default DetialsTabView;
