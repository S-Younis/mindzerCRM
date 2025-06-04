import { Text } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView, useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { useCallback } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import MindzerButton from "../shared/MindzerButton";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { myDarkTheme } from "@/configs/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";



type BottomModalSheetProps = {
  ref?: React.RefObject<BottomSheetMethods | null>
}

const BottomModalSheet = (({ ref }: BottomModalSheetProps) => {

  const renderBackdrop = useCallback((props: BottomSheetDefaultBackdropProps) => <BottomSheetBackdrop opacity={0.7} appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, [])
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 180,
  });

  const { colorScheme } = useColorScheme(); // Auto-detect system color scheme

  const showCreateContact = () => {
    router.push('/contacts/createContact');
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
        <MindzerButton isTitleCentered variants='primary' className="w-full" onPress={showCreateContact}  >
          <MaterialCommunityIcons name="import"size={18}   className="mr-2" color="white" />
          <Text className={`font-medium text-white   `}>
            Import VCF
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