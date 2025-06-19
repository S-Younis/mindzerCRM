import { Text, View } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView, useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useCallback, useState } from 'react';
import { useColorScheme } from 'nativewind';
import { myDarkTheme } from '@/configs/theme';
import ListOptionCheckBox from '@/components/shared/ListOptionCheckBox';
import { CustomInput } from '@/components/shared/CustomInput';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { FlashList } from '@shopify/flash-list';
import MindzerButton from '@/components/shared/MindzerButton';

type erpType = {
  iGpCustomerId: number;
  sCustomerId: string;
  sCustomer: string;
  sCompany: string;
  value: string;
};

type BottomModalSheetProps = {
  ref?: React.RefObject<BottomSheetMethods | null>;
  erp_lst: erpType[];
  erpOnChangeFunc?: ((value: number) => void) | undefined;
  selectedErpId: number;
  setSelectedErpId: (id: number) => void;
};

const SelectERP = ({ ref, erp_lst, erpOnChangeFunc, selectedErpId, setSelectedErpId }: BottomModalSheetProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredErp = erp_lst.filter(item => {
    if (item.sCustomerId.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true;
    }
    if (item.sCustomer.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true;
    }
    return false;
  });

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

  const handleErpSelection = (item: erpType) => {
    setSelectedErpId(item.iGpCustomerId);
    erpOnChangeFunc?.(item.iGpCustomerId); // 👈 Update form state
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
      <BottomSheetView className="justify-between px-4 pb-12 h-full ">
        <View className="p-2 h-[54px] mb-4">
          <CustomInput
            placeholder="Search by ID or Name "
            containerClassName="py-[1px]  pr-2 flex-1"
            clearButtonMode="while-editing"
            onChangeText={e => setSearchQuery(e)}>
            <MaterialCommunityIcons name="magnify" size={18} color={'#fafafa'} />
          </CustomInput>
        </View>

        <Text className="text-gray-500 text-sm">ID/Name/Company</Text>
        <View style={{ height: 400, marginBottom: 4 }}>
          <FlashList
            data={filteredErp}
            renderItem={({ item }) => (
              <ListOptionCheckBox
                onPress={() => handleErpSelection(item)}
                isChecked={selectedErpId == item.iGpCustomerId}
                className="!bg-transparent"
                title={item.value}
              />
            )}
            keyExtractor={item => `${item.sCustomerId}~${item.sCustomer}~${item.sCompany}`}
            estimatedItemSize={filteredErp.length == 0 ? 5 : 70}
          />
        </View>

        <View className=" mt-auto  px-4 ">
          <MindzerButton isTitleCentered variants="secondary" onPress={() => ref?.current?.close()}>
            <Text className={`font-medium text-white`}>Close</Text>
          </MindzerButton>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default SelectERP;
