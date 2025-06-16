import { Text, View } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView, useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useCallback } from 'react';
import MindzerButton from '../../shared/MindzerButton';
import { useColorScheme } from 'nativewind';
import { myDarkTheme } from '@/configs/theme';
import ListOptionCheckBox from '@/components/shared/ListOptionCheckBox';
import { FlashList } from '@shopify/flash-list';

type industryType = {
  industryId: number;
  sIndustry: string;
};
type BottomModalSheetProps = {
  ref?: React.RefObject<BottomSheetMethods | null>;
  industries_lst: industryType[];
  selectedIndustriesId: number[] | undefined;
  setSelectedIndustriesId: (value: number[]) => void;
};

const SelectIndustry = ({ ref, industries_lst, selectedIndustriesId, setSelectedIndustriesId }: BottomModalSheetProps) => {
  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => <BottomSheetBackdrop opacity={0.7} appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 180,
  });

  const { colorScheme } = useColorScheme(); // Auto-detect system color scheme

  const handleIndustrySelection = (item: industryType) => {
    setSelectedIndustriesId([...(selectedIndustriesId || []), item.industryId]);
    // ref?.current?.close();
  };

  return (
    <BottomSheet
      ref={ref}
      snapPoints={['30%']}
      backdropComponent={renderBackdrop}
      index={-1}
      animationConfigs={animationConfigs}
      backgroundStyle={{
        backgroundColor: colorScheme === 'dark' ? myDarkTheme.colors.card : '#fff',
      }}
      handleIndicatorStyle={{
        backgroundColor: colorScheme === 'dark' ? '#D3D3D3' : '#DCDCDC',
      }}>
      <BottomSheetView className="justify-between px-4 pb-12 gap-4  ">
        <View className="pb-3 px-2 flex-row items-center justify-end">
          <Text className={`text-lg  text-blue-400`}>Save </Text>
        </View>

        <View style={{ height: 400, marginBottom: 4 }}>
          <FlashList
            data={industries_lst}
            renderItem={({ item }) => (
              <ListOptionCheckBox
                onPress={() => handleIndustrySelection(item)}
                isChecked={selectedIndustriesId?.includes(item.industryId)}
                className="!bg-transparent"
                title={item.sIndustry}
              />
            )}
            keyExtractor={item => item.industryId.toString()}
            estimatedItemSize={industries_lst.length == 0 ? 5 : 70}
            extraData={selectedIndustriesId} // 👈 Force update when this changes
          />
        </View>

        <MindzerButton isTitleCentered variants="secondary" className="w-full" onPress={() => ref?.current?.close()}>
          <Text className={`font-medium text-white   `}>Cancel</Text>
        </MindzerButton>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default SelectIndustry;
