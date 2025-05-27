import { View, TouchableOpacity } from "react-native";
import BottomModalSheet from "@/components/contactsPage/BottomModalSheet";
import React, { useRef } from "react";
import Feather from '@expo/vector-icons/Feather';
import BottomSheet from "@gorhom/bottom-sheet";
import { myLightTheme } from "@/configs/theme";
import { ContactCard } from "@/components/contactsPage/ContactCard";

export default function contacts() {

  const bottomSheetRef = useRef<BottomSheet>(null);


  return (
    <View className="flex-1 pt-10 ">

      <ContactCard sFullName={"Sayed Younis Moahmmed"} sJobTitle="Front-end Dev" sEmail={"younis.mohamemd@gmail.com"} />

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


