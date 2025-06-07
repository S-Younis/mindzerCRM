import { Text, View } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView, useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { useCallback } from "react";
import MindzerButton from "../../shared/MindzerButton";
import { useColorScheme } from "nativewind";
import { myDarkTheme } from "@/configs/theme";
import ListOptionCheckBox from "@/components/shared/ListOptionCheckBox";

type BottomModalSheetProps = {
  ref?: React.RefObject<BottomSheetMethods | null>
  isbPrivateField: boolean;
  setIsbPrivateField: (value: boolean) => void;
}

const SelectPrivate = (({ ref, isbPrivateField, setIsbPrivateField }: BottomModalSheetProps) => {

  const renderBackdrop = useCallback((props: BottomSheetDefaultBackdropProps) => <BottomSheetBackdrop opacity={0.7} appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, [])
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 180,
  });

  const { colorScheme } = useColorScheme(); // Auto-detect system color scheme

  return (
    <BottomSheet
      ref={ref}
      snapPoints={['30%']}
      backdropComponent={renderBackdrop}
      index={-1}
      animationConfigs={animationConfigs}
      backgroundStyle={{ backgroundColor: colorScheme === 'dark' ? myDarkTheme.colors.card : '#fff' }}
      handleIndicatorStyle={{ backgroundColor: colorScheme === 'dark' ? '#D3D3D3' : '#DCDCDC' }}
    >
      <BottomSheetView className="justify-between px-4 pb-12 h-full " >

        <View>
          <ListOptionCheckBox className="!bg-transparent" isChecked={isbPrivateField} onPress={() => {
            setIsbPrivateField(true);
            ref?.current?.close();
          }} title="Yes" />
          <ListOptionCheckBox className="!bg-transparent" isChecked={!isbPrivateField} onPress={() => {
            setIsbPrivateField(false)
            ref?.current?.close();
          }} title="No" />
        </View>

        <MindzerButton isTitleCentered variants='secondary' className="w-full" onPress={() => ref?.current?.close()}  >
          <Text className={`font-medium text-white   `}>
            Cancel
          </Text>
        </MindzerButton>

      </BottomSheetView>
    </BottomSheet >
  );
}
);

export default SelectPrivate;