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

type sStatusType = {
  iStatusId: number;
  sStatus: string;
};

type BottomModalSheetProps = {
  ref?: React.RefObject<BottomSheetMethods | null>;
  status_lst: sStatusType[];
  selectedStatusId: number;
  setSelectedStatusId: (value: number) => void;
  statusOnChangeFunc?: ((value: number) => void) | undefined;
};

const SelectStatus = ({ ref, status_lst, selectedStatusId, setSelectedStatusId, statusOnChangeFunc }: BottomModalSheetProps) => {
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

  const handleAreaSelection = (item: sStatusType) => {
    setSelectedStatusId(item.iStatusId);
    statusOnChangeFunc?.(item.iStatusId); // 👈 Update form state
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
            data={status_lst}
            renderItem={({ item }) => (
              <ListOptionCheckBox
                onPress={() => handleAreaSelection(item)}
                isChecked={selectedStatusId == item.iStatusId}
                className="!bg-transparent"
                title={item.sStatus}
              />
            )}
            extraData={selectedStatusId}
            keyExtractor={item => item.iStatusId.toString()}
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

export default SelectStatus;
