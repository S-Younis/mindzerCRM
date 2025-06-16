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
import { ScrollView } from 'react-native-gesture-handler';

type sAreaType = {
  iAreaId: number;
  sArea: string;
};

type BottomModalSheetProps = {
  ref?: React.RefObject<BottomSheetMethods | null>;
  areas_lst: sAreaType[];
  selectedArea: sAreaType | null;
  setSelectedArea: (value: sAreaType | null) => void;
  // setareas_lst: (value: sAreaType[]) => void;
};

const SelectArea = ({ ref, areas_lst, selectedArea, setSelectedArea }: BottomModalSheetProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAreaField = areas_lst.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderBackdrop = useCallback((props: BottomSheetDefaultBackdropProps) => <BottomSheetBackdrop opacity={0.7} appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []);
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 180,
  });

  const { colorScheme } = useColorScheme(); // Auto-detect system color scheme

  const handleAreaSelection = (item: sAreaType) => {
    setSelectedArea(item);
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
      <View className="px-6 mb-[12px]">
        <Text onPress={() => ref?.current?.close()} className="text-lg text-blue-400">
          Close
        </Text>
      </View>
      <BottomSheetView className="justify-between gap-[20px] px-4 pb-20 h-full ">
        <View className="p-2 h-[54px]">
          <CustomInput placeholder="Search" containerClassName="py-[1px]  pr-2 flex-1" clearButtonMode="while-editing" onChangeText={e => setSearchQuery(e)}>
            <MaterialCommunityIcons name="magnify" size={18} color={'#fafafa'} />
          </CustomInput>
        </View>

        <ScrollView className="h-full">
          <FlashList
            data={filteredAreaField}
            renderItem={({ item }) => <ListOptionCheckBox onPress={() => handleAreaSelection(item)} isChecked={selectedArea?.name == item.name} className="!bg-transparent" title={item.name} />}
            keyExtractor={item => item.id.toString()}
            estimatedItemSize={filteredAreaField.length == 0 ? 5 : 70}
          />
          {/* <ListOptionCheckBox className="!bg-transparent" isChecked={areas_lst} onPress={() => {
            setareas_lst(true);
            ref?.current?.close();
          }} title="Active" /> */}
        </ScrollView>
        {/* <MindzerButton isTitleCentered variants='secondary' className="w-full" onPress={() => ref?.current?.close()}  >
            <Text className={`font-medium text-white `}>
              Cancel
            </Text>
          </MindzerButton> */}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default SelectArea;
