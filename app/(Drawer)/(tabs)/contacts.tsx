import { View, Text, TouchableOpacity } from "react-native";
import BottomModalSheet from "@components/BottomModalSheet";
import React, { useRef } from "react";
import Feather from '@expo/vector-icons/Feather';
import BottomSheet from "@gorhom/bottom-sheet";
import { myLightTheme } from "@/configs/theme";
export default function contacts() {

  const bottomSheetRef = useRef<BottomSheet>(null);


  return (
    <View className="flex-1 items-center justify-center">
      <View className="bg-[#303e5f] border-[#262f3a] border-2 flex items-center justify-center w-[80%] h-40 rounded-xl">
      </View>
      <Text>contacts</Text>
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


