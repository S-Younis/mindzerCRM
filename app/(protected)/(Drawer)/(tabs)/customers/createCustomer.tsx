import { View, Text, Alert, ScrollView } from 'react-native';
import React, { useRef, useState } from 'react';
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
import { lst_customers_areas, lst_customers_industries, lst_customers_users, lst_customers_status, lst_customers_categories } from '@/constants/customers';
import ListOptionSection from '@/components/shared/ListOptionSection';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useColorScheme } from 'nativewind';

const createCustomer = () => {
  const { colorScheme } = useColorScheme(); // Auto-detect system color scheme

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
      //   iGp_CustomerId_: null,
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
          title: 'Create Customer',
          headerStyle: { backgroundColor: '#161f2e' },
          headerLeft: () => (
            <Text className="text-blue-400 text-xl" onPress={handleCancelBTN}>
              Cancel
            </Text>
          ),
          headerRight: () => (
            <Text className="text-blue-400  text-xl" onPress={handleCreateBTN}>
              Save
            </Text>
          ),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 ">
        <View className="px-3 pt-2 gap-4 mb-12">
          <View>
            <Text className=" text-gray-400  text-xs mt-4 mb-[6px] ml-3 ">Customer Details</Text>
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
              name="iCategoryId"
              render={({ field: { onChange, onBlur, value } }) => {
                const CategoryText = lst_customers_categories.find(category => category.iCategoryId === value)?.sCategory || 'Select Category';
                return (
                  <ListFormOption
                    onPress={() => {}}
                    className="rounded-br-lg rounded-bl-lg border-b-0"
                    onBlur={onBlur}
                    value={CategoryText}
                    isReadOnly={true}
                    isRequired
                    title="ERP Customer"
                    hasOpenIcon
                  />
                );
              }}
            />
          </View>
          {/* Contats Section  */}
          <View>
            <Text className=" text-gray-400 text-xs mt-2 mb-[6px] ml-3 ">Contacts</Text>
            <ListOptionSection
              title="Associated Contacts"
              icon={<MaterialCommunityIcons name="account-multiple" size={20} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />}
              onPress={() => router.push('customers/contacts/relatedContacts')}
            />
          </View>
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

export default createCustomer;
