import { Text, View } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView, useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useCallback } from 'react';
import { useColorScheme } from 'nativewind';
import { myDarkTheme } from '@/configs/theme';
import ListOptionCheckBox from '@/components/shared/ListOptionCheckBox';
import { FlashList } from '@shopify/flash-list';
import MindzerButton from '@/components/shared/MindzerButton';

type sCategoryType = {
  iCategoryId: number;
  sCategory: string;
};

type BottomModalSheetProps = {
  ref?: React.RefObject<BottomSheetMethods | null>;
  category_lst: sCategoryType[];
  selectedCategoryId: number;
  setSelectedCategoryId: (value: number) => void;
  categoryOnChangeFunc?: ((value: number) => void) | undefined;
};

const SelectCategory = ({ ref, category_lst, selectedCategoryId, setSelectedCategoryId, categoryOnChangeFunc }: BottomModalSheetProps) => {
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

  const handleAreaSelection = (item: sCategoryType) => {
    setSelectedCategoryId(item.iCategoryId);
    categoryOnChangeFunc?.(item.iCategoryId); // 👈 Update form state
    ref?.current?.close();
  };

  return (
    <BottomSheet
      ref={ref}
      snapPoints={['65%']}
      backdropComponent={renderBackdrop}
      index={-1}
      animationConfigs={animationConfigs}
      backgroundStyle={{ backgroundColor: colorScheme === 'dark' ? myDarkTheme.colors.card : '#fff' }}
      handleIndicatorStyle={{ backgroundColor: colorScheme === 'dark' ? '#D3D3D3' : '#DCDCDC' }}>
      <BottomSheetView className="justify-between  px-4 pb-12 h-full ">
        <View style={{ height: 400, marginBottom: 4 }}>
          <FlashList
            data={category_lst}
            renderItem={({ item }) => (
              <ListOptionCheckBox
                onPress={() => handleAreaSelection(item)}
                isChecked={selectedCategoryId == item.iCategoryId}
                className="!bg-transparent"
                title={item.sCategory}
              />
            )}
            extraData={selectedCategoryId}
            keyExtractor={item => item.iCategoryId.toString()}
            estimatedItemSize={70}
          />
        </View>
        <View className=" mt-auto px-4 ">
          <MindzerButton isTitleCentered variants="secondary" onPress={() => ref?.current?.close()}>
            <Text className={`font-medium text-white`}>Close</Text>
          </MindzerButton>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default SelectCategory;
