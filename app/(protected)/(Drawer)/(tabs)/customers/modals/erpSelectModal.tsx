import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { router, Stack } from 'expo-router';
import { lst_customers_erp } from '@/constants/customers';
import { useCreateCustomerStore } from '@/stores/customer.store';
import MindzerButton from '@/components/shared/MindzerButton';
import ListOptionCheckBox from '@/components/shared/ListOptionCheckBox';
import { FlashList } from '@shopify/flash-list';
import { CustomInput } from '@/components/shared/CustomInput';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Animated from 'react-native-reanimated';
import { FadeIn, FadeOut } from 'react-native-reanimated';
const ErpSelectModal = () => {
  const { erpOnChange, clearErpOnChange, selectedErpId, setSelectedErpId } = useCreateCustomerStore();

  const [searchQuery, setSearchQuery] = useState('');
  const filteredErp = lst_customers_erp.filter(item => {
    if (item.sCustomerId.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true;
    }
    if (item.sCustomer.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true;
    }
    return false;
  });

  type erpType = {
    iGpCustomerId: number;
    sCustomerId: string;
    sCustomer: string;
    sCompany: string;
    value: string;
  };

  const handleErpSelection = (item: erpType) => {
    erpOnChange?.(item.iGpCustomerId);
    setSelectedErpId(item.iGpCustomerId);
  };
  const handleClearSelection = () => {
    setSelectedErpId(-1);
    setSearchQuery('');
    clearErpOnChange?.();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'ERP Customer',
          headerRight: () =>
            selectedErpId != -1 ? (
              <Animated.Text
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                onPress={() => handleClearSelection()}
                style={{ display: selectedErpId != -1 ? 'flex' : 'none' }}
                className={`text-lg text-blue-400 `}>
                Clear all
              </Animated.Text>
            ) : null,
        }}
      />
      <View className="flex-1 h-full">
        <View className="p-2 h-[54px] my-4 mx-2 ">
          <CustomInput
            placeholder="Search by ID or Name "
            containerClassName="py-[1px]  pr-2 flex-1"
            clearButtonMode="while-editing"
            onChangeText={e => setSearchQuery(e)}>
            <MaterialCommunityIcons name="magnify" size={18} color={'#fafafa'} />
          </CustomInput>
        </View>

        <Text className="text-gray-500 text-sm ml-5 mb-1">ID / Name / Company</Text>
        <View className="flex-1 mb-6">
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
        <View className=" mt-auto px-4 mb-8">
          <MindzerButton isTitleCentered variants="primary" onPress={() => router.back()}>
            <Text className={`font-medium text-white`}>Save</Text>
          </MindzerButton>
        </View>
      </View>
    </>
  );
};

export default ErpSelectModal;
