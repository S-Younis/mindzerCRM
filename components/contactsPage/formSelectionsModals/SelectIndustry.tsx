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
  industryOnChangeFunc?: ((value: number[]) => void) | undefined;
  isMultipleSelection?: boolean; // Optional prop to indicate if multiple selection is allowed
};

const SelectIndustry = ({
  ref,
  industryOnChangeFunc,
  industries_lst,
  selectedIndustriesId,
  setSelectedIndustriesId,
  isMultipleSelection = false,
}: BottomModalSheetProps) => {
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
    if (selectedIndustriesId?.includes(item.industryId)) {
      const newIds = selectedIndustriesId.filter(id => id != item.industryId);
      setSelectedIndustriesId(newIds);
      industryOnChangeFunc?.(newIds); // 👈 Update form state
    } else {
      const newIds = [...(selectedIndustriesId || []), item.industryId];
      setSelectedIndustriesId(newIds);
      industryOnChangeFunc?.(newIds); // 👈 Update form state
    }

    // ref?.current?.close();
  };

  const handleClearAll = () => {
    setSelectedIndustriesId([]);
    industryOnChangeFunc?.([]);
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
      <BottomSheetView className="justify-between px-2  gap-4  ">
        <View className="pb-2 px-4 flex-row items-center justify-start">
          <Text onPress={handleClearAll} className={`text-md  text-blue-400`}>
            Clear All
          </Text>
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

        <View className=" px-4 mb-12">
          <MindzerButton isTitleCentered variants="secondary" onPress={() => ref?.current?.close()}>
            <Text className={`font-medium text-white   `}>Close</Text>
          </MindzerButton>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default SelectIndustry;
