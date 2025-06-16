import { View, Text, Alert, ScrollView } from 'react-native';
import React, { useRef, useState } from 'react';
import { router, Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ListFormOption from '@/components/shared/ListFormOption';
import { FormSchema, FormDataType } from '@/types/schemas/customer.sheme';
import SelectStatus from '@/components/contactsPage/formSelectionsModals/SelectStatus';
import BottomSheet from '@gorhom/bottom-sheet';
import SelectIndustry from '@/components/customersPage/formSelectionsModals/SelectIndustry';
import SelectArea from '@/components/contactsPage/formSelectionsModals/SelectArea';
import { lst_customers_areas, lst_customers_industries } from '@/constants/customers';

type sAreaType = {
  iAreaId: number;
  sArea: string;
};
const createCustomer = () => {
  const [selectedIndustriesId, setSelectedIndustriesId] = useState<number[] | undefined>(undefined);
  const industryOnChangeRef = useRef<(ids: number[]) => void>(null);

  const [selectedAreaId, setSelectedAreaId] = useState<number>(-1);
  const areaOnChangeRef = useRef<(id: number) => void>(null);

  // Modals Refs
  //   const select_status_modalRef = useRef<BottomSheet>(null);
  const select_industry_modalRef = useRef<BottomSheet>(null);
  const select_sArea_modalRef = useRef<BottomSheet>(null);

  const { control, handleSubmit } = useForm<FormDataType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sName: '',
      lstIndustryIds: [],
      iAreaId: -1,
      //   iCategoryId: 0,
      //   iUserAppManagerId: 0,
      //   iCustomerStatusId: 0,
      //   sLocation: '',
      //   sLicensor: '',
      //   sProcess: '',
      //   sCapacity: '',
      //   sWebUrl: '',
      //   iGp_CustomerId_: null,
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
                    hasOpenIcon
                  />
                );
              }}
            />
            {/*
            <Controller
              control={control}
              name="sCompany"
              render={({ field: { onChange, onBlur, value } }) => (
                <ListFormOption
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  isReadOnly={false}
                  title="Company"
                />
              )}
            />
            <Controller
              control={control}
              name="sActive"
              render={({ field: { onChange, onBlur, value } }) => (
                <ListFormOption
                  hasOpenIcon
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={isActiveField ? 'Active' : 'Inactive'}
                  isReadOnly={true}
                  title="Status"
                  onPress={() => select_status_modalRef.current?.expand()}
                />
              )}
            />

            <Controller
              control={control}
              name="bPrivate"
              render={({ field: { onChange, onBlur, value } }) => (
                <ListFormOption
                  hasOpenIcon
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={isbPrivateField ? 'Yes' : 'No'}
                  isReadOnly={true}
                  title="Private ( Limited Visibility )"
                  onPress={() => select_industry_modalRef.current?.expand()}
                  className="rounded-br-lg rounded-bl-lg "
                /> */}
            {/* )} */}
            {/* /> */}
          </View>
          {/* Phones Section  */}
          <View>
            <Text className=" text-gray-400 text-xs mt-2 mb-[6px] ml-3 ">Phones</Text>

            {/* <Controller
              control={control}
              name="sPhoneBusiness"
              render={({ field: { onChange, onBlur, value } }) => (
                <ListFormOption
                  onBlur={onBlur}
                  onChangeText={onChange}
                  isReadOnly={false}
                  title="Bussiness"
                  value={value}
                  className="rounded-tr-lg rounded-tl-lg "
                />
              )}
            />

            <Controller
              control={control}
              name="sPhoneMobile"
              render={({ field: { onChange, onBlur, value } }) => (
                <ListFormOption
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  isReadOnly={false}
                  title="Mobile"
                  className="rounded-br-lg rounded-bl-lg "
                />
              )}
            /> */}
          </View>
          {/* Address Section */}
          <View>
            <Text className=" text-gray-400 text-xs mt-2 mb-[6px] ml-3 ">Address</Text>
            {/* 
            <Controller
              control={control}
              name="sArea"
              render={({ field: { onChange, onBlur, value } }) => (
                <ListFormOption
                  onBlur={onBlur}
                  onChangeText={onChange}
                  isReadOnly={true}
                  title="Country"
                  hasOpenIcon
                  onPress={() => select_sArea_modalRef.current?.expand()}
                  value={selectedArea?.name}
                  titleMarginLeft={4}
                  className="rounded-tr-lg rounded-tl-lg "
                />
              )}
            />
            <Controller
              control={control}
              name="sCity"
              render={({ field: { onChange, onBlur, value } }) => (
                <ListFormOption
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  isReadOnly={false}
                  title="City"
                />
              )}
            />

            <Controller
              control={control}
              name="sAddress"
              render={({ field: { onChange, onBlur, value } }) => (
                <ListFormOption
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  isReadOnly={false}
                  title="Full Address"
                  className="rounded-br-lg rounded-bl-lg "
                />
              )}
            /> */}
          </View>
        </View>
      </ScrollView>

      {/* Select Fields Modals */}
      {/* <SelectStatus ref={select_status_modalRef} isActiveField={isActiveField} setIsActiveField={setIsActiveField} /> */}
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
        areaOnChangeFunc={id => areaOnChangeRef.current?.(id)} // 👈 Execute stored function
        selectedAreaId={selectedAreaId}
        setSelectedAreaId={setSelectedAreaId}
      />
    </>
  );
};

export default createCustomer;
