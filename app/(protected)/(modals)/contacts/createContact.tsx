import { View, Text, Alert, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ListFormOption from '@/components/shared/ListFormOption';
import { FormSchema, FormDataType } from '@/types/schemas/contact.sheme';
import { useContactStore } from '@/stores/contacts/contact.store';
import { contacts_lst } from '@/constants/contacts';
import { lst_customers_areas } from '@/constants/customers';
import BottomSheet from '@gorhom/bottom-sheet';
import SelectPrivate from '@/components/contactsPage/formSelectionsModals/SelectPrivate';
import SelectArea from '@/components/contactsPage/formSelectionsModals/SelectArea';

const createContact = () => {
  const [isContactPrivate, setIsContactPrivate] = useState(false); // State to manage the selected area
  const bPrivateOnChangeRef = useRef<(isPrivate: boolean) => void>(null);

  const [selectedAreaId, setSelectedAreaId] = useState(-1); // State to manage the selected area
  const areaOnChangeRef = useRef<(id: number) => void>(null);

  // Modals Refs
  const select_bPrivate_modalRef = useRef<BottomSheet>(null);
  const select_sArea_modalRef = useRef<BottomSheet>(null);

  // IF Navigated from import contact page
  const { importType } = useLocalSearchParams() as { importType: 'phone' | 'scan' };
  let importContact_Obj = null;

  if (importType == 'phone') {
    importContact_Obj = useContactStore(state => state.importContact_Obj);
    // console.log('Import Contact Object:', importContact_Obj);
  } else if (importType == 'scan') {
    importContact_Obj = useContactStore(state => state.scannedContact_Obj);
  }

  const matchedAreaId = lst_customers_areas.find(area => importContact_Obj?.addresses?.[0]?.country?.includes(area.sArea))?.iAreaId;

  const formDefaultValues = (importType: 'phone' | 'scan' | null = null) => {
    if (importType == 'phone') {
      return {
        sFullName: ((importContact_Obj?.firstName || '') + ' ' + (importContact_Obj?.lastName || '')).trim(),
        sEmail: importContact_Obj?.emails[0].email || '',
        sJobTitle: importContact_Obj?.sJobTitle || '',
        sCompany: importContact_Obj?.sCompany || '',
        bPrivate: importContact_Obj?.bPrivate || false,
        sPhoneMobile: importContact_Obj?.phoneNumbers[0]?.number || '',
        sPhoneBusiness: importContact_Obj?.phoneNumbers[1]?.number || importContact_Obj?.phoneNumbers[0]?.number || '',
        sArea: matchedAreaId || -1,
        sCity: importContact_Obj?.addresses?.[0]?.city || '',
        sAddress: importContact_Obj?.addresses?.[0]?.address || '',
        sComment: importContact_Obj?.sComment || '',
      };
    } else if (importType == 'scan') {
      // If importing from scan, use the imported contact object
      return {
        sFullName: (importContact_Obj['First Name'] || '') + ' ' + (importContact_Obj['Last Name'] || '').trim(),
        sEmail: importContact_Obj['Email'] || '',
        sJobTitle: importContact_Obj['Job Title'] || '',
        sCompany: importContact_Obj?.sCompany || '',
        bPrivate: importContact_Obj?.bPrivate || false,
        sPhoneMobile: importContact_Obj['Mobile Phone'] || '',
        sPhoneBusiness: importContact_Obj['Business Phone'] || '',
        sArea: matchedAreaId || -1,
        sCity: importContact_Obj?.addresses?.[0]?.city || '',
        sAddress: importContact_Obj?.addresses?.[0]?.address || '',
        sComment: importContact_Obj?.sComment || '',
      };
    } else {
      // Default values when not importing
      return {
        sFullName: '',
        sEmail: '',
        sJobTitle: '',
        sCompany: '',
        bPrivate: false,
        sPhoneMobile: '',
        sPhoneBusiness: '',
        sArea: -1,
        sCity: '',
        sAddress: '',
        sComment: '',
      };
    }
  };

  const { control, handleSubmit } = useForm<FormDataType>({
    resolver: zodResolver(FormSchema),
    defaultValues: formDefaultValues(importType),
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
    if (importType == 'scan') {
      router.dismissTo('/contacts');
    } else {
      router.back();
    }
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
    contacts_lst.push({
      iContactId: Math.random() * 100,
      sFullName: data.sFullName,
      sEmail: data.sEmail,
      sPhoneMobile: data.sPhoneMobile || '',
      sJobTitle: data.sJobTitle || '',
      eCompany: 0,
      sCompany: data.sCompany,
      sPhoneBusiness: data.sPhoneBusiness || '',
      bEdit: true,
      bPrivate: data.bPrivate,
      sArea: data.sArea,
      sCity: data.sCity,
      sAddress: data.sAddress,
      sComment: data.sComment || '',
      sActive: false,
      sAreaName: '',
    });

    Toast.show({
      type: 'success',
      text1: 'Created Successfully',
      text2: 'You can now view the contact in the contacts list.',
      position: 'top',
      visibilityTime: 2000,
    });
    router.push('/contacts');
  };

  return (
    <>
      {/* Dynamic Stack Header  */}
      <Stack.Screen
        options={{
          title: 'Create Contact',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity activeOpacity={0.6} onPress={handleCancelBTN}>
              <Text className=" text-light dark:text-blue-400 text-xl">Cancel</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.6} onPress={handleCreateBTN}>
              <Text className="text-light dark:text-blue-400  text-xl">Save</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 ">
        <View className="px-4 pt-2 gap-4 mb-12">
          <View>
            <Text className="text-gray-500 dark:text-gray-400  text-sm mt-4 mb-[6px] ml-3 ">Personal Details</Text>
            <View className=" bg-gray-100 dark:bg-transparent py-1  border dark:border-0  border-gray-300/60 rounded-xl ">
              <Controller
                control={control}
                name="sFullName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ListFormOption
                    onBlur={onBlur}
                    onChangeText={onChange}
                    isReadOnly={false}
                    title="Full Name"
                    value={value}
                    isRequired
                    className="rounded-tr-lg rounded-tl-lg "
                  />
                )}
              />
              <Controller
                control={control}
                name="sEmail"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ListFormOption onChangeText={onChange} onBlur={onBlur} value={value} isReadOnly={false} isRequired title="Email" />
                )}
              />
              <Controller
                control={control}
                name="sJobTitle"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ListFormOption onChangeText={onChange} onBlur={onBlur} value={value} isReadOnly={false} title="Job Title" />
                )}
              />
              <Controller
                control={control}
                name="sCompany"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ListFormOption onChangeText={onChange} onBlur={onBlur} value={value} isRequired isReadOnly={false} title="Company" />
                )}
              />

              <Controller
                control={control}
                name="bPrivate"
                render={({ field: { onChange, onBlur, value } }) => {
                  return (
                    <ListFormOption
                      className="rounded-br-lg rounded-bl-lg !border-b-0 "
                      onPress={() => {
                        bPrivateOnChangeRef.current = onChange; // 👈 Update ref on render
                        select_bPrivate_modalRef.current?.expand();
                      }}
                      onBlur={onBlur}
                      value={value ? 'Yes' : 'No'}
                      isReadOnly={true}
                      title="Private ( Limited Visibility )"
                      isRequired
                      hasOpenIcon
                    />
                  );
                }}
              />
            </View>
          </View>
          {/* Phones Section  */}
          <View>
            <Text className=" text-gray-500 dark:text-gray-400  text-sm mt-2 mb-[6px] ml-3 ">Phones</Text>
            <View className=" bg-gray-100 dark:bg-transparent py-1  border dark:border-0  border-gray-300/60 rounded-xl ">
              <Controller
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
                    className="rounded-br-lg rounded-bl-lg !border-b-0 "
                  />
                )}
              />
            </View>
          </View>
          {/* Address Section */}
          <View>
            <Text className=" text-gray-500 dark:text-gray-400  text-sm mt-2 mb-[6px] ml-3 ">Address</Text>
            <View className=" bg-gray-100 dark:bg-transparent py-1  border dark:border-0  border-gray-300/60 rounded-xl ">
              <Controller
                control={control}
                name="sArea"
                render={({ field: { onChange, onBlur, value } }) => {
                  const formIndustryText = lst_customers_areas.find(area => area.iAreaId === value)?.sArea || 'Select Area';
                  return (
                    <ListFormOption
                      className="rounded-tr-lg rounded-tl-lg "
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
                name="sCity"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ListFormOption onChangeText={onChange} onBlur={onBlur} value={value} isReadOnly={false} title="City" />
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
                    className="rounded-br-lg rounded-bl-lg !border-b-0 "
                  />
                )}
              />
            </View>
          </View>
          {/* Comment Section */}
          <View>
            <Text className=" text-gray-500 dark:text-gray-400  text-sm mt-2 mb-[6px] ml-3 ">Comment</Text>
            <View className=" bg-gray-100 dark:bg-transparent py-1  border dark:border-0  border-gray-300/60 rounded-xl ">
              <Controller
                control={control}
                name="sComment"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Add a comment..."
                    multiline
                    numberOfLines={4}
                    className="dark:bg-[#161f2e] min-h-20 text-light text-sm px-4 py-2 rounded-lg  placeholder:text-gray-400"
                  />
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Select Fields Modals */}
      <SelectPrivate
        ref={select_bPrivate_modalRef}
        bPrivateOnChangeFunc={(isPrivate: boolean) => bPrivateOnChangeRef.current?.(isPrivate)}
        isContactPrivate={isContactPrivate}
        setIsContactPrivate={setIsContactPrivate}
      />
      <SelectArea
        ref={select_sArea_modalRef}
        areas_lst={lst_customers_areas}
        areaOnChangeFunc={(id: number) => areaOnChangeRef.current?.(id)}
        selectedAreaId={selectedAreaId}
        setSelectedAreaId={setSelectedAreaId}
      />
    </>
  );
};

export default createContact;
