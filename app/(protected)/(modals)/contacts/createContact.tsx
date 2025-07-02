import { View, Text, Alert, ScrollView, TextInput } from 'react-native';
import React, { useRef, useState } from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ListFormOption from '@/components/shared/ListFormOption';
import { FormSchema, FormDataType } from '@/types/schemas/contact.sheme';
import { useContactStore } from '@/stores/contact.store';
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
  const { importContact } = useLocalSearchParams() as { importContact: string };
  const importContact_Obj = importContact == 'true' ? useContactStore(state => state.importContact_Obj) : null;
  const matchedAreaId = lst_customers_areas.find(area => importContact_Obj?.addresses?.[0]?.country?.includes(area.sArea))?.iAreaId;

  const { control, handleSubmit } = useForm<FormDataType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sFullName: importContact_Obj?.name || '',
      sEmail: importContact_Obj?.emails?.[0]?.email || '',
      sJobTitle: importContact_Obj?.jobTitle || '',
      sCompany: '',
      bPrivate: false,
      sPhoneMobile: importContact_Obj?.phoneNumbers?.[0]?.number || '',
      sPhoneBusiness: importContact_Obj?.phoneNumbers?.[1]?.number || '',
      sArea: matchedAreaId || -1,
      sCity: importContact_Obj?.addresses?.[0]?.city || '',
      sAddress: importContact_Obj?.addresses?.[0]?.street || '',
      sComment: importContact_Obj?.note || '',
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
          // headerStyle: { backgroundColor: '#161f2e' },
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
            <Text className=" text-gray-400  text-xs mt-4 mb-[6px] ml-3 ">Personal Details</Text>
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
                    className="rounded-br-lg rounded-bl-lg border-b-0 "
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
          {/* Phones Section  */}
          <View>
            <Text className=" text-gray-400 text-xs mt-2 mb-[6px] ml-3 ">Phones</Text>

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
                  className="rounded-br-lg rounded-bl-lg border-b-0 "
                />
              )}
            />
          </View>
          {/* Address Section */}
          <View>
            <Text className=" text-gray-400 text-xs mt-2 mb-[6px] ml-3 ">Address</Text>

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
                  className="rounded-br-lg rounded-bl-lg "
                />
              )}
            />
          </View>
          {/* Comment Section */}
          <View>
            <Text className=" text-gray-400 text-xs mt-2 mb-[6px] ml-3 ">Comment</Text>

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
                  className="bg-[#161f2e] min-h-20 text-light text-sm px-4 py-2 rounded-lg border border-gray-800 placeholder:text-gray-400"
                />
              )}
            />
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
