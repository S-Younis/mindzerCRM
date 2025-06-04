import { View, Text, Alert, ScrollView } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import Toast from 'react-native-toast-message'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ListFormOption from '@/components/shared/ListFormOption'
import { FormSchema, FormDataType } from '@/types/schemas/contact.sheme'

const createContact = () => {

    const {
        control,
        handleSubmit,
    } = useForm<FormDataType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            sFullName: '',
            sEmail: '',
            sJobTitle: '',
            sCompany: '',
            sActive: 'Active',
            bPrivate: 'No',
            sPhoneMobile: '',
            sPhoneBusiness: '',
            sArea: '',
            sCity: '',
            sAddress: ''
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
            <View className='px-3 gap-4 mb-12'>
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
                                titleMarginLeft={4}
                                className='rounded-tr-lg rounded-tl-lg ' />
                        )}
                    />
                    <Controller
                        control={control}
                        name="sEmail"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ListFormOption onChangeText={onChange} onBlur={onBlur} value={value} isReadOnly={false} title='Email' titleMarginLeft={4} />
                        )}
                    />
                    <Controller
                        control={control}
                        name="sJobTitle"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ListFormOption onChangeText={onChange} onBlur={onBlur} value={value} isReadOnly={false} title='Job Title' titleMarginLeft={4} />
                        )}
                    />
                    <Controller
                        control={control}
                        name="sCompany"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ListFormOption onChangeText={onChange} onBlur={onBlur} value={value} isReadOnly={false} title='Company' titleMarginLeft={4} />
                        )}
                    />
                    <Controller
                        control={control}
                        name="sActive"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ListFormOption onChangeText={onChange} onBlur={onBlur} value={value} isReadOnly={false} title='Status' titleMarginLeft={4} />
                        )}
                    />

                    <Controller
                        control={control}
                        name="bPrivate"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ListFormOption onChangeText={onChange} onBlur={onBlur} value={value} isReadOnly={false} title='Private ( Limited Visibility )' titleMarginLeft={4} className='rounded-br-lg rounded-bl-lg ' />
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
                                titleMarginLeft={4}
                                className='rounded-tr-lg rounded-tl-lg ' />
                        )}
                    />

                    <Controller
                        control={control}
                        name="sPhoneMobile"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ListFormOption onChangeText={onChange} onBlur={onBlur} value={value} isReadOnly={false} title='Mobile' titleMarginLeft={4} className='rounded-br-lg rounded-bl-lg ' />
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
                                isReadOnly={false}
                                title='Country'
                                value={value}
                                titleMarginLeft={4}
                                className='rounded-tr-lg rounded-tl-lg ' />
                        )}
                    />
                    <Controller
                        control={control}
                        name="sCity"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ListFormOption onChangeText={onChange} onBlur={onBlur} value={value} isReadOnly={false} title='City' titleMarginLeft={4} />
                        )}
                    />

                    <Controller
                        control={control}
                        name="sAddress"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ListFormOption onChangeText={onChange} onBlur={onBlur} value={value} isReadOnly={false} title='Full Address' titleMarginLeft={4} className='rounded-br-lg rounded-bl-lg ' />
                        )}
                    />

                </View>

            </View>
        </ScrollView>

    </>


}

export default createContact


