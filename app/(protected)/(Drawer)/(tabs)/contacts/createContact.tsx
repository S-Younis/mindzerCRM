import { View, Text, Alert, ScrollView, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import Toast from 'react-native-toast-message'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ListFormOption from '@/components/shared/ListFormOption'
import { FormSchema, FormDataType } from '@/types/schemas/contact.sheme'
import { useContactStore } from '@/stores/contact.store'
import { contacts_lst } from "@/constants/contacts";
import SelectStatus from '@/components/contactsPage/formSelectionsModals/SelectStatus'
import BottomSheet from '@gorhom/bottom-sheet'
import SelectPrivate from '@/components/contactsPage/formSelectionsModals/SelectPrivate'
import SelectArea from '@/components/contactsPage/formSelectionsModals/SelectArea'

type sAreaType = {
    id: number;
    name: string;
}
const createContact = () => {

    const [isActiveField, setIsActiveField] = useState<boolean>(true); // State to manage the active status field
    const [isbPrivateField, setIsbPrivateField] = useState<boolean>(false); // State to manage the active status field
    const [sAreaField, setsAreaField] = useState<sAreaType[]>([
        { id: 1, name: 'Egypt' },
        { id: 2, name: 'USA' },
        { id: 3, name: 'UAE' },
        { id: 4, name: 'KSA' },
        { id: 5, name: 'Qatar' },
        { id: 6, name: 'Oman' },
        { id: 7, name: 'Bahrain' },
        { id: 8, name: 'Kuwait' },
    ]);
    const [selectedArea, setSelectedArea] = useState<sAreaType | null>(null); // State to manage the selected area


    // Modals Refs
    const select_status_modalRef = useRef<BottomSheet>(null);
    const select_bPrivate_modalRef = useRef<BottomSheet>(null);
    const select_sArea_modalRef = useRef<BottomSheet>(null);

    // IF Navigated from import contact page  
    const { importContact } = useLocalSearchParams() as { importContact: string };
    const importContact_Obj = importContact == 'true' ? useContactStore((state) => state.importContact_Obj) : null;

    const {
        control,
        handleSubmit,
    } = useForm<FormDataType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            sFullName: importContact_Obj?.name || '',
            sEmail: importContact_Obj?.emails?.[0]?.email || '',
            sJobTitle: importContact_Obj?.jobTitle || '',
            sCompany: '',
            sActive: isActiveField ? 'Active' : 'Inactive',
            bPrivate: 'No',
            sPhoneMobile: importContact_Obj?.phoneNumbers?.[0]?.number || '',
            sPhoneBusiness: importContact_Obj?.phoneNumbers?.[1]?.number || '',
            sArea: importContact_Obj?.addresses?.[0]?.country || '',
            sCity: importContact_Obj?.addresses?.[0]?.city || '',
            sAddress: (importContact_Obj?.addresses?.[0]?.street) || '',
            sComment: importContact_Obj?.note || '',
        }
    })


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
    }

    const handleCreateBTN = () => {

        console.log("------------------- "); // Check keys/values
        console.log("Formy values ", control._formValues); // Check keys/values

        const result = FormSchema.safeParse(control._formValues);

        if (result.success) {
            handleSubmit(handleFormSubmit)();
        } else {
            console.log('Validation Error:', result);
            Alert.alert(
                'OPS !',
                `${result.error.errors[0].message}`,
                [{ text: 'OK', }]
            );
        }

    }
    const handleFormSubmit: SubmitHandler<FormDataType> = (data) => {

        // **** Clean Data only is Recived "validated values"  ****
        console.log('Form Data X:', data);
        // Backend Logic here : 
        contacts_lst.push({
            iContactId: Math.random() * 100,
            sFullName: data.sFullName,
            sEmail: data.sEmail,
            sPhoneMobile: data.sPhoneMobile || '', // Ensure mobile phone is not undefined
            sJobTitle: data.sJobTitle,
            eCompany: 0, // Assuming 0 means no company selected
            sCompany: data.sCompany,
            sPhoneBusiness: data.sPhoneBusiness || '', // Ensure business phone is not undefined
            sActive: data.sActive === 'Active', // Convert string to boolean
            bEdit: true, // Assuming new contacts are editable
            bPrivate: data.bPrivate === 'Yes', // Convert string to boolean
            sArea: data.sArea,
            sCity: data.sCity,
            sAddress: data.sAddress,
            sComment: data.sComment || '', // Ensure comment is not undefined
        });

        Toast.show({
            type: 'success',
            text1: 'Created Successfully',
            text2: 'You can now view the contact in the contacts list.',
            position: 'top',
            visibilityTime: 2000,

        });
        router.push('/contacts');
    }

    return <>
        {/* Dynamic Stack Header  */}
        <Stack.Screen options={{
            title: 'Create Contact',
            headerStyle: { backgroundColor: '#161f2e' },
            headerLeft: () => <Text className='text-blue-400 text-xl' onPress={handleCancelBTN}>Cancel</Text>,
            headerRight: () => <Text className='text-blue-400  text-xl' onPress={handleCreateBTN} >Save</Text>,
        }} />
        <ScrollView showsVerticalScrollIndicator={false} className='flex-1 '>
            <View className='px-3 pt-2 gap-4 mb-12'>
                <View>
                    <Text className=' text-gray-400  text-xs mt-4 mb-[6px] ml-3 '>Personal Details</Text>
                    <Controller
                        control={control}
                        name="sFullName"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ListFormOption
                                onBlur={onBlur}
                                onChangeText={onChange}
                                isReadOnly={false}
                                title='Full Name'
                                value={value}
                                className='rounded-tr-lg rounded-tl-lg ' />
                        )}
                    />
                    <Controller
                        control={control}
                        name="sEmail"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ListFormOption onChangeText={onChange} onBlur={onBlur} value={value} isReadOnly={false} title='Email' />
                        )}
                    />
                    <Controller
                        control={control}
                        name="sJobTitle"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ListFormOption onChangeText={onChange} onBlur={onBlur} value={value} isReadOnly={false} title='Job Title' />
                        )}
                    />
                    <Controller
                        control={control}
                        name="sCompany"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ListFormOption onChangeText={onChange} onBlur={onBlur} value={value} isReadOnly={false} title='Company' />
                        )}
                    />
                    <Controller
                        control={control}
                        name="sActive"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ListFormOption hasOpenIcon onChangeText={onChange} onBlur={onBlur} value={isActiveField ? 'Active' : 'Inactive'} isReadOnly={true} title='Status' onPress={() => select_status_modalRef.current?.expand()} />
                        )}
                    />

                    <Controller
                        control={control}
                        name="bPrivate"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ListFormOption hasOpenIcon onChangeText={onChange} onBlur={onBlur} value={isbPrivateField ? 'Yes' : 'No'} isReadOnly={true} title='Private ( Limited Visibility )' onPress={() => select_bPrivate_modalRef.current?.expand()} className='rounded-br-lg rounded-bl-lg ' />
                        )}
                    />


                </View>
                {/* Phones Section  */}
                <View>
                    <Text className=' text-gray-400 text-xs mt-2 mb-[6px] ml-3 '>Phones</Text>

                    <Controller
                        control={control}
                        name="sPhoneBusiness"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ListFormOption
                                onBlur={onBlur}
                                onChangeText={onChange}
                                isReadOnly={false}
                                title='Bussiness'
                                value={value}
                                className='rounded-tr-lg rounded-tl-lg ' />
                        )}
                    />

                    <Controller
                        control={control}
                        name="sPhoneMobile"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ListFormOption onChangeText={onChange} onBlur={onBlur} value={value} isReadOnly={false} title='Mobile' className='rounded-br-lg rounded-bl-lg ' />
                        )}
                    />

                </View>
                {/* Address Section */}
                <View>
                    <Text className=' text-gray-400 text-xs mt-2 mb-[6px] ml-3 '>Address</Text>

                    <Controller
                        control={control}
                        name="sArea"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ListFormOption
                                onBlur={onBlur}
                                onChangeText={onChange}
                                isReadOnly={true}
                                title='Country'
                                hasOpenIcon
                                onPress={() => select_sArea_modalRef.current?.expand()}
                                value={selectedArea?.name}
                                titleMarginLeft={4}
                                className='rounded-tr-lg rounded-tl-lg ' />
                        )}
                    />
                    <Controller
                        control={control}
                        name="sCity"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ListFormOption onChangeText={onChange} onBlur={onBlur} value={value} isReadOnly={false} title='City' />
                        )}
                    />

                    <Controller
                        control={control}
                        name="sAddress"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ListFormOption onChangeText={onChange} onBlur={onBlur} value={value} isReadOnly={false} title='Full Address' className='rounded-br-lg rounded-bl-lg ' />
                        )}
                    />

                </View>
                {/* Comment Section */}
                <View>
                    <Text className=' text-gray-400 text-xs mt-2 mb-[6px] ml-3 '>Comment</Text>

                    <Controller
                        control={control}
                        name="sComment"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                placeholder='Add a comment...'
                                multiline
                                numberOfLines={4}
                                className='bg-[#161f2e] min-h-20 text-light text-sm px-4 py-2 rounded-lg border border-gray-800 placeholder:text-gray-400' />
                        )}
                    />

                </View>

            </View>
        </ScrollView>

        {/* Select Fields Modals */}
        < SelectStatus ref={select_status_modalRef} isActiveField={isActiveField} setIsActiveField={setIsActiveField} />
        <SelectPrivate ref={select_bPrivate_modalRef} isbPrivateField={isbPrivateField} setIsbPrivateField={setIsbPrivateField} />
        <SelectArea ref={select_sArea_modalRef} sAreaField={sAreaField} selectedArea={selectedArea} setSelectedArea={setSelectedArea} />
    </>


}

export default createContact


