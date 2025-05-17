import { View , Text, Pressable , StyleSheet, TouchableOpacity } from "react-native";
import  BottomModalSheet  from "@components/BottomModalSheet";
import React, { useRef } from "react";
import Feather from '@expo/vector-icons/Feather';
import BottomSheet from "@gorhom/bottom-sheet";

export default function contacts() {
  
  const bottomSheetRef = useRef<BottomSheet>(null);


  return  (
   <View style={styles.container}>
     <Text>contacts</Text>
       <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 24,
          backgroundColor: 'blue',
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

