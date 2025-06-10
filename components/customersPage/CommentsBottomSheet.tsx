import { Text } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView, useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { useCallback } from "react";
import MindzerButton from "../shared/MindzerButton";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { myDarkTheme } from "@/configs/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";



type CommentsBottomSheetProps = {
  ref?: React.RefObject<BottomSheetMethods | null>
}

const CommentsBottomSheet = (({ ref }: CommentsBottomSheetProps) => {

  const renderBackdrop = useCallback((props: BottomSheetDefaultBackdropProps) => <BottomSheetBackdrop opacity={0.7} appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, [])
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 180,
  });

  const { colorScheme } = useColorScheme(); // Auto-detect system color scheme

  const showCreateCustomer = () => {
    router.push('/customers/createComment');
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

        <MindzerButton isTitleCentered variants='primary' className="w-full" onPress={showCreateCustomer}  >
          <MaterialCommunityIcons name="comment-plus-outline" size={18} color="white" className="mr-2" />

          <Text className={`font-medium text-white `}>
            Add Comment
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

export default CommentsBottomSheet;