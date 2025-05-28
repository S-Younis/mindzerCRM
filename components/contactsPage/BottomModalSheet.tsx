import { Text, StyleSheet, Pressable, View } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView, useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';
import { forwardRef, useCallback } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import MindzerButton from "../shared/MindzerButton";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { myDarkTheme } from "@/configs/theme";


type Ref = BottomSheet;

const BottomModalSheet = forwardRef<Ref, any>((props, ref) => {

  const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop opacity={0.7}  appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, [])
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 150,
  });

  const { colorScheme } = useColorScheme(); // Auto-detect system color scheme

  const showCreateContact = () => {
    router.navigate('/contacts/createContactModal');
    // dismiss the bottom sheet
    ref?.current?.close()
  }

  return (
    <BottomSheet
      ref={ref}
      snapPoints={['20%']}
      backdropComponent={renderBackdrop}
      index={-1}
      animationConfigs={animationConfigs}
      backgroundStyle={{ backgroundColor: colorScheme === 'dark' ? myDarkTheme.colors.card : '#fff' }}
      handleIndicatorStyle={{ backgroundColor: colorScheme === 'dark' ? '#D3D3D3' : '#DCDCDC' }}
    >
      <BottomSheetView className="flex gap-4 p-4   " >

        <MindzerButton isTitleCentered variants='primary' className="w-full" onPress={showCreateContact}  >
          <AntDesign name="adduser" size={18} color="white" className="mr-2" />
          <Text className={`font-medium text-white   `}>
            Create New Contact
          </Text>
        </MindzerButton>
        <MindzerButton isTitleCentered variants='secondary' className="w-full " onPress={() => ref?.current?.close()}   >
          <Text className={`font-medium  text-gray-200 `}>
            Cancel
          </Text>
        </MindzerButton>
      </BottomSheetView>
    </BottomSheet>
  );
}
);

export default BottomModalSheet;