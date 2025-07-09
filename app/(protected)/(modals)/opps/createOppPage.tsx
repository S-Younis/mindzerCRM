import { View, Text, Alert, ScrollView, TouchableOpacity, StyleSheet, TextInput, Pressable } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { router, Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ListFormOption from '@/components/shared/ListFormOption';
import { FormSchema, FormDataType } from '@/types/schemas/customer.sheme';
import BottomSheet from '@gorhom/bottom-sheet';
import SelectIndustry from '@/components/contactsPage/formSelectionsModals/SelectIndustry';
import SelectArea from '@/components/contactsPage/formSelectionsModals/SelectArea';
import SelectManager from '@/components/contactsPage/formSelectionsModals/SelectManager';
import SelectStatus from '@/components/contactsPage/formSelectionsModals/SelectStatus';
import SelectCategory from '@/components/contactsPage/formSelectionsModals/SelectCategory';
import {
  lst_customers_areas,
  lst_customers_industries,
  lst_customers_users,
  lst_customers_status,
  lst_customers_categories,
  lst_customers_erp,
} from '@/constants/customers';
import ListOptionSection from '@/components/shared/ListOptionSection';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useColorScheme } from 'nativewind';
import { useCreateCustomerStore } from '@/stores/customer.store';

const createOpp = () => {
  const { colorScheme } = useColorScheme();
  const [country] = React.useState();
  const [selectedIndustriesId, setSelectedIndustriesId] = useState<number[] | undefined>(undefined);
  const industryOnChangeRef = useRef<(ids: number[]) => void>(null);

  const [selectedAreaId, setSelectedAreaId] = useState<number>(-1);
  const areaOnChangeRef = useRef<(id: number) => void>(null);

  const [selectedManagerId, setSelectedManagerId] = useState<number>(-1);
  const managerOnChangeRef = useRef<(id: number) => void>(null);

  const [selectedStatusId, setSelectedStatusId] = useState<number>(1);
  const statusOnChangeRef = useRef<(id: number) => void>(null);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);
  const categoryOnChangeRef = useRef<(id: number) => void>(null);

  const { setErpOnChange, clearErpOnChange } = useCreateCustomerStore();

  // Modals Refs
  const select_industry_modalRef = useRef<BottomSheet>(null);
  const select_sArea_modalRef = useRef<BottomSheet>(null);
  const select_manager_modalRef = useRef<BottomSheet>(null);
  const select_status_modalRef = useRef<BottomSheet>(null);
  const select_category_modalRef = useRef<BottomSheet>(null);

  const { control, handleSubmit } = useForm<FormDataType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sName: '',
      lstIndustryIds: [],
      iAreaId: -1,
      sLocation: '',
      iUserAppManagerId: 0,
      iStatusId: 1,
      iCategoryId: -1,
      iGp_CustomerId_: null,
      //   sLicensor: '',
      //   sProcess: '',
      //   sCapacity: '',
      //   sWebUrl: '',
    },
  });

  const handleCancelBTN = () => {
    // if (control._getDirty()) {
    // Alert.alert('Cancel Changes', 'Are you sure you want to discard changes made ?', [
    //     {
    //         text: 'Cancel',
    //         style: 'cancel',
    //     },
    //     { text: 'OK', onPress: () => router.back() },
    // ]);
    // } else {
    router.back();
    // }
  };

  const handleCreateBTN = () => {
    console.log('------------------- '); // Check keys/values
    console.log('Formy values ', control._formValues); // Check keys/values

    const result = FormSchema.safeParse(control._formValues);

    if (result.success) {
      handleSubmit(handleFormSubmit)();
    } else {
      console.log('Validation Error:', result);
      Alert.alert('OPS !', `${result.error.errors[0].message}`, [{ text: 'OK' }]);
    }
  };
  const handleFormSubmit: SubmitHandler<FormDataType> = data => {
    // **** Clean Data only is Recived "validated values"  ****
    console.log('Form Data X:', data);
    // Backend Logic here :

    Toast.show({
      type: 'success',
      text1: 'Created Successfully',
      text2: 'You can now view the contact in the contacts list.',
      position: 'top',
      visibilityTime: 2000,
    });
    // router.push('/contacts');
  };

  return (
    <>
      {/* Dynamic Stack Header  */}
      <Stack.Screen
        options={{
          title: 'Create Opp',
          headerLeft: () => (
            <TouchableOpacity activeOpacity={0.7} onPress={handleCancelBTN}>
              <Text className="text-light dark:text-blue-400 text-xl h-full "> Cancel</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.7} onPress={handleCreateBTN}>
              <Text className="text-light dark:text-blue-400  text-xl">Save</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 ">
        <View className="px-3 pt-2 gap-4 mb-12">
          <View>
            {/* <Text className=" text-gray-400  text-xs mt-4 mb-[6px] ml-3 ">Customer Details</Text> */}

            {/* Header */}
            <View className="flex-row items-center px-5 py-4 bg-white border-b border-slate-200 mb-2">
              <MaterialCommunityIcons name="calculator-variant" size={22} color="#1e3a8a" />
              <Text className="text-lg font-semibold text-blue-900 ml-3">Customer Details</Text>
            </View>

            <View style={{ ...styles.card, paddingHorizontal: 0, paddingVertical: 2 }}>
              <Controller
                control={control}
                name="sName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ListFormOption
                    onBlur={onBlur}
                    onChangeText={onChange}
                    isReadOnly={false}
                    isRequired
                    title="Customer Name"
                    value={value}
                    className="rounded-tr-lg rounded-tl-lg "
                  />
                )}
              />
              <Controller
                control={control}
                name="lstIndustryIds"
                render={({ field: { onBlur, value, onChange } }) => {
                  const formIndustryText = lst_customers_industries
                    .filter(industry => value?.includes(industry.industryId))
                    .map(item => item.sIndustry)
                    .join(',');

                  return (
                    <ListFormOption
                      onPress={() => {
                        industryOnChangeRef.current = onChange; // 👈 Update ref on render
                        select_industry_modalRef.current?.expand();
                      }}
                      onBlur={onBlur}
                      value={formIndustryText}
                      isReadOnly={true}
                      title="Industries"
                      hasOpenIcon
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name="iAreaId"
                render={({ field: { onChange, onBlur, value } }) => {
                  const formIndustryText = lst_customers_areas.find(area => area.iAreaId === value)?.sArea || 'Select Area';
                  return (
                    <ListFormOption
                      onPress={() => {
                        areaOnChangeRef.current = onChange; // 👈 Update ref on render
                        select_sArea_modalRef.current?.expand();
                      }}
                      onBlur={onBlur}
                      value={formIndustryText}
                      isReadOnly={true}
                      title="Country"
                      isRequired
                      hasOpenIcon
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name="sLocation"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ListFormOption onChangeText={onChange} onBlur={onBlur} value={value} isReadOnly={false} title="Location" />
                )}
              />

              <Controller
                control={control}
                name="iUserAppManagerId"
                render={({ field: { onChange, onBlur, value } }) => {
                  const AccountManagerText = lst_customers_users.find(area => area.iUserAppManagerId === value)?.sUserAppManager || 'Select Manager';
                  return (
                    <ListFormOption
                      onPress={() => {
                        managerOnChangeRef.current = onChange; // 👈 Update ref on render
                        select_manager_modalRef.current?.expand();
                      }}
                      onBlur={onBlur}
                      value={AccountManagerText}
                      isReadOnly={true}
                      title="Account Manager"
                      isRequired
                      hasOpenIcon
                    />
                  );
                }}
              />

              <Controller
                control={control}
                name="iStatusId"
                render={({ field: { onChange, onBlur, value } }) => {
                  const StatusText = lst_customers_status.find(status => status.iStatusId === value)?.sStatus || 'Select Status';
                  return (
                    <ListFormOption
                      onPress={() => {
                        statusOnChangeRef.current = onChange; // 👈 Update ref on render
                        select_status_modalRef.current?.expand();
                      }}
                      onBlur={onBlur}
                      value={StatusText}
                      isReadOnly={true}
                      title="Status"
                      hasOpenIcon
                    />
                  );
                }}
              />

              <Controller
                control={control}
                name="iCategoryId"
                render={({ field: { onChange, onBlur, value } }) => {
                  const CategoryText = lst_customers_categories.find(category => category.iCategoryId === value)?.sCategory || 'Select Category';
                  return (
                    <ListFormOption
                      onPress={() => {
                        categoryOnChangeRef.current = onChange; // 👈 Update ref on render
                        select_category_modalRef.current?.expand();
                      }}
                      onBlur={onBlur}
                      value={CategoryText}
                      isReadOnly={true}
                      isRequired
                      title="Category"
                      hasOpenIcon
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name="iGp_CustomerId_"
                render={({ field: { onChange, onBlur, value } }) => {
                  const customerText = lst_customers_erp.find(customer => customer.iGpCustomerId === value)?.value || '';

                  // Update the store whenever onChange changes
                  useEffect(() => {
                    setErpOnChange(onChange);
                    return () => {
                      // Clean up when component unmounts
                      clearErpOnChange();
                    };
                  }, [onChange]);
                  return (
                    <ListFormOption
                      onPress={() => {
                        router.push('/customers/modals/erpSelectModal');
                      }}
                      className="rounded-br-lg rounded-bl-lg !border-b-0"
                      onBlur={onBlur}
                      value={customerText}
                      isReadOnly={true}
                      title="ERP Customer"
                      hasOpenIcon
                    />
                  );
                }}
              />
            </View>
          </View>
          {/* Deals Section  */}
          {/* Header */}
          <View className="flex-row items-center px-5 py-4 bg-white border-b border-slate-200">
            <MaterialCommunityIcons name="calculator-variant" size={22} color="#4f46e5" />
            <Text className="text-lg font-semibold text-slate-800 ml-3">Business Calculator</Text>
          </View>

          {/* Market Overview Card */}
          {/* <View style={styles.card}>
            <View className="flex-row items-center mb-3">
              <Text className="text-white text-lg font-semibold ml-2">Market Overview</Text>
            </View>
            <View className="flex-row justify-between">
              <View>
                <Text className="text-blue-100 text-sm">Total Market</Text>
                <Text className="text-white text-2xl font-bold">23 Kg</Text>
              </View>
              <View>
                <Text className="text-blue-100 text-sm">Our Potential</Text>
                <Text className="text-white text-2xl font-bold">23 $</Text>
              </View>
            </View>
          </View> */}

          {/* Input Section */}
          <View style={styles.card}>
            <Text className="text-lg font-semibold text-slate-800 mb-4">Market Data</Text>

            <View className="mb-5">
              <Text className="text-sm font-medium text-slate-500/90 dark:text-gray-400 mb-2 ml-1">Annual Consumption</Text>
              <View className="flex-row items-center border border-slate-300 rounded-lg bg-white">
                <TextInput
                  className="flex-1 px-4 py-3 text-base text-slate-700"
                  // value={formData.annualConsumption}
                  // onChangeText={value => updateFormData('annualConsumption', value)}
                  placeholder="0"
                  keyboardType="numeric"
                  placeholderTextColor="#9ca3af"
                />
                <Text className="px-3 text-sm text-slate-500 font-medium">Kg</Text>
              </View>
            </View>

            <View className="mb-5">
              <Text className="text-sm font-medium text-slate-500/90 dark:text-gray-400  mb-2">Our Maximum Potential Share</Text>
              <View className="flex-row items-center border border-slate-300 rounded-lg bg-white">
                <TextInput
                  className="flex-1 px-4 py-3 text-base text-slate-700"
                  // value={formData.maxPotentialShare}
                  // onChangeText={value => updateFormData('maxPotentialShare', value)}
                  placeholder="0"
                  keyboardType="numeric"
                  placeholderTextColor="#9ca3af"
                />
                <Text className="px-3 text-sm text-slate-500/90 dark:text-gray-400 font-medium">Kg</Text>
              </View>
            </View>
          </View>

          {/* Pricing Section */}
          <View style={styles.card}>
            <View className="flex-row items-center mb-4">
              <Text className="text-lg font-semibold text-slate-800 ml-2">Pricing & Margins</Text>
            </View>

            <View className="mb-5">
              <Text className="text-sm font-medium text-slate-600 mb-2">Average Selling Price</Text>
              <View className="flex-row items-center border border-slate-300 rounded-lg bg-white">
                <TextInput
                  className="flex-1 px-4 py-3 text-base text-slate-800"
                  // value={formData.averageSellingPrice}
                  // onChangeText={value => updateFormData('averageSellingPrice', value)}
                  placeholder="0"
                  keyboardType="numeric"
                  placeholderTextColor="#9ca3af"
                />
                <TouchableOpacity className="flex-row items-center px-3 py-3 border-l border-slate-300">
                  <Text className="text-sm text-slate-600 font-medium mr-1">$</Text>
                  {/* <ChevronDown color="#6b7280" size={16} /> */}
                </TouchableOpacity>
              </View>
            </View>

            <View className="mb-5">
              <Text className="text-sm font-medium text-slate-600 mb-2">Gross Margin</Text>
              <View className="flex-row items-center border border-slate-300 rounded-lg bg-white">
                <TextInput
                  className="flex-1 px-4 py-3 text-base text-slate-800"
                  // value={formData.grossMarginPercent}
                  // onChangeText={value => updateFormData('grossMarginPercent', value)}
                  placeholder="0.0"
                  keyboardType="numeric"
                  placeholderTextColor="#9ca3af"
                />
                <Text className="px-3 text-sm text-slate-500 font-medium">%</Text>
              </View>
            </View>
          </View>

          {/* Forecast Section */}
          <View style={styles.card}>
            <Text className="text-lg font-semibold text-slate-800 mb-4">2025 Forecast</Text>

            <View className="mb-5">
              <Text className="text-sm font-medium text-slate-600 mb-2">Expected Sales Quantity</Text>
              <View className="flex-row items-center border border-slate-300 rounded-lg bg-white">
                <TextInput
                  className="flex-1 px-4 py-3 text-base text-slate-800"
                  // value={formData.forecastSalesQuantity}
                  // onChangeText={value => updateFormData('forecastSalesQuantity', value)}
                  placeholder="0"
                  keyboardType="numeric"
                  placeholderTextColor="#9ca3af"
                />
                <Text className="px-3 text-sm text-slate-500 font-medium">Kg</Text>
              </View>
            </View>

            <View className="mt-3 p-3 bg-slate-50 rounded-lg">
              <Text className="text-sm text-slate-600 font-medium">23 out of 23kg</Text>
              <Text className="text-xs text-slate-500 mt-1">Of our Maximum Potential Share = 23%</Text>
            </View>
          </View>

          {/* Results Section */}
          <View style={styles.card}>
            <View className="flex-row items-center mb-4">
              <MaterialCommunityIcons name="calculator" size={24} color="#4f46e5" />
              <Text className="text-lg font-semibold text-slate-800 ml-2">Calculation Results</Text>
            </View>

            <View className="mb-5">
              <Text className="text-xs font-semibold text-slate-500 tracking-wide mb-3">POTENTIAL VALUES</Text>
              <View className="flex-row justify-between items-center py-2">
                <Text className="text-sm text-slate-600 font-medium">Sales Amount</Text>
                <Text className="text-base text-slate-800 font-semibold">23 Kg</Text>
              </View>
              <View className="flex-row justify-between items-center py-2">
                <Text className="text-sm text-slate-600 font-medium">Gross Margin</Text>
                <Text className="text-base text-slate-800 font-semibold">23 Kg</Text>
              </View>
            </View>

            <View className="mb-5">
              <Text className="text-xs font-semibold text-slate-500 tracking-wide mb-3">EXPECTED VALUES</Text>
              <View className="flex-row justify-between items-center py-2">
                <Text className="text-sm text-slate-600 font-medium">Sales Amount</Text>
                <Text className="text-base text-green-600 font-semibold">23Kg</Text>
              </View>
              <View className="flex-row justify-between items-center py-2">
                <Text className="text-sm text-slate-600 font-medium">Gross Margin</Text>
                <Text className="text-base text-green-600 font-semibold">23Kg</Text>
              </View>
              <View className="flex-row justify-between items-center py-2">
                <Text className="text-sm text-slate-600 font-medium">Sales Quantity</Text>
                <Text className="text-base text-slate-800 font-semibold">23Kg</Text>
              </View>
            </View>
          </View>

          {/* Deals Section  */}

          {/* Create Button */}

          <TouchableOpacity activeOpacity={0.9} className="bg-blue-600 mx-4 my-6 py-4 rounded-xl items-center shadow-lg shadow-blue-600/30">
            <Text className="text-white text-base font-semibold">Create Business Plan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Select Fields Modals */}
      <SelectIndustry
        ref={select_industry_modalRef}
        industries_lst={lst_customers_industries}
        industryOnChangeFunc={ids => industryOnChangeRef.current?.(ids)} // 👈 Execute stored function
        selectedIndustriesId={selectedIndustriesId}
        setSelectedIndustriesId={setSelectedIndustriesId}
      />
      <SelectArea
        ref={select_sArea_modalRef}
        areas_lst={lst_customers_areas}
        selectedAreaId={selectedAreaId}
        setSelectedAreaId={setSelectedAreaId}
        areaOnChangeFunc={id => areaOnChangeRef.current?.(id)} // 👈 Execute stored function
      />
      <SelectManager
        ref={select_manager_modalRef}
        managers_lst={lst_customers_users}
        selectedManagerId={selectedManagerId}
        setSelectedManagerId={setSelectedManagerId}
        managerOnChangeFunc={id => managerOnChangeRef.current?.(id)} // 👈 Execute stored function
      />
      <SelectStatus
        ref={select_status_modalRef}
        status_lst={lst_customers_status}
        selectedStatusId={selectedStatusId}
        setSelectedStatusId={setSelectedStatusId}
        statusOnChangeFunc={id => statusOnChangeRef.current?.(id)} // 👈 Execute stored function
      />
      <SelectCategory
        ref={select_category_modalRef}
        category_lst={lst_customers_categories}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
        categoryOnChangeFunc={id => categoryOnChangeRef.current?.(id)} // 👈 Execute stored function
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    marginHorizontal: 8,
    marginTop: 6,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
});
export default createOpp;
