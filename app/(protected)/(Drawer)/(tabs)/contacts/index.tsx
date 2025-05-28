import { View, TouchableOpacity, Pressable, Text } from "react-native";
import BottomModalSheet from "@/components/contactsPage/BottomModalSheet";
import React, { useRef } from "react";
import Feather from '@expo/vector-icons/Feather';
import BottomSheet from "@gorhom/bottom-sheet";
import { myLightTheme } from "@/configs/theme";
import { ContactCard } from "@/components/contactsPage/ContactCard";
import { FlashList } from "@shopify/flash-list";
import { FontAwesome } from "@expo/vector-icons";
import { contacts_lst } from "@/constants/contacts";
import { useColorScheme } from "nativewind";
import { myDarkTheme } from "@/configs/theme";
export default function contacts() {

  const bottomSheetRef = useRef<BottomSheet>(null);
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-1 ">

      <View className={`h-11 flex-row items-center justify-between border-1 border-t-0 border-x-0 border-gray-800   pl-6 pr-5 pb-[10px]  ${colorScheme == 'dark' ? myDarkTheme.colors.card : '#fafafa'} border`}>
        <Text className="text-md text-light  ">Contacts ( 2 ) </Text>
        <Pressable className={`flex-row items-center justify-center gap-[2px] p-1 px-2 bg-[#161f2e] border-[#262f3a] border-2  rounded-lg  `} >
          <FontAwesome className=" mb-1 ml-1" name="sort-desc" size={14} color="#fafafa" />
          <Text className="text-sm adaptive-text "> Sort By : Name  </Text>
        </Pressable>
      </View>

      <FlashList
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        data={contacts_lst}
        renderItem={({ item, index }) => <ContactCard className={`${index == 0 ? 'mt-4' : index == contacts_lst.length - 1 ? 'mb-4' : ''}`} sFullName={item.sFullName} sJobTitle={item.sJobTitle} sEmail={item.sEmail} />}
        keyExtractor={(item) => item.iContactId.toString()}
        estimatedItemSize={20}
      />

      <TouchableOpacity
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
        }}
        onPress={() =>
          bottomSheetRef.current?.expand()
        }
      >
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
      <BottomModalSheet ref={bottomSheetRef} />
    </View>
  );
}


