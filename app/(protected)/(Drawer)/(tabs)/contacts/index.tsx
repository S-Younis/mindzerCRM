import { View, TouchableOpacity, FlatList } from "react-native";
import BottomModalSheet from "@/components/contactsPage/BottomModalSheet";
import React, { useRef } from "react";
import Feather from '@expo/vector-icons/Feather';
import BottomSheet from "@gorhom/bottom-sheet";
import { myLightTheme } from "@/configs/theme";
import { ContactCard } from "@/components/contactsPage/ContactCard";
import MindzerButton from "@/components/shared/MindzerButton";

export default function contacts() {

  const bottomSheetRef = useRef<BottomSheet>(null);


  return (
    <View className="flex-1 ">

      <View className=" h-10 justify-center px-4 mb-4">
        <MindzerButton variants={"outline"} width="11"  height="11"/>
      </View>

      <FlatList
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        data={[{
          iContactId: '1',
          sFullName: 'Sayed Younis Moahmmed',
          sJobTitle: 'Front end  Engineer',
          sEmail: 'younis.mohamemd@gmail.com',
        }, {
          iContactId: '2',
          sFullName: 'Alexander Nicholas',
          sJobTitle: 'Software Engineer',
          sEmail: 'Alex.sdsd@gmail.com',
        }]}
        renderItem={({ item }) => <ContactCard sFullName={item.sFullName} sJobTitle={item.sJobTitle} sEmail={item.sEmail} />}
        keyExtractor={item => item.iContactId}
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


