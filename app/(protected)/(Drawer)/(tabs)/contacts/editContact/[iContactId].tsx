import { View, Text, Alert, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import ListFormOption from '@/components/shared/ListFormOption';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { contacts_lst } from '@/constants/contacts';
const editContactModal = () => {

    const { iContactId } = useLocalSearchParams();
    const { setOptions } = useNavigation();

    const USER = contacts_lst.find(contact => contact.iContactId === parseInt(iContactId as string));

    useLayoutEffect(() => {
        setOptions({
            headerLeft: () => <Text className='text-blue-400 text-lg' onPress={handleModalCancel}>Cancel</Text>,
            headerRight: () => <Text className='text-blue-400  text-lg' onPress={handleModalSave} >Save</Text>,
        });
    }, []);


    type FormDataType = {
        sEmail: string
        sFullName: string
        sJobTitle: string
        sCompany: string;
        sActive: string;
        bPrivate: string;
        sPhoneMobile?: string;
        sPhoneBusiness?: string;
        sArea: string;
        sCity?: string;
        sAddress?: string;
    }

    const FormSchema = z.object({
        sEmail: z.string().nonempty({ message: 'User Id is required' }),
        sFullName: z.string().nonempty({ message: 'Password is required' }).min(4, { message: 'Password must be at least 4 characters long' }),

        sJobTitle: z.string().nonempty({ message: 'Job Title is required' }),
        sCompany: z.string().nonempty({ message: 'Company is required' }),
        sActive: z.string().nonempty({ message: 'Status is required' }),
        bPrivate: z.string().nonempty({ message: 'bPrivate is required' }),
        sPhoneMobile: z.string().optional(),
        sPhoneBusiness: z.string().optional(),
        sArea: z.string().nonempty({ message: 'Country is required' }),
        sCity: z.string().optional(),
        sAddress: z.string().optional(),

    });

    const {
        control,
        handleSubmit,
        setError,
        // clearErrors,
        formState: {
            isDirty,

            errors,
            // isValid  
        },
    } = useForm<FormDataType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            sEmail: USER?.sEmail || '',
            sFullName: USER?.sFullName || '',
            sJobTitle: USER?.sJobTitle || '',
            sCompany: USER?.sCompany || '',
            sActive: USER?.sActive ? 'Active' : 'Inactive',
            bPrivate: USER?.bPrivate ? 'Yes' : 'No',
            sPhoneMobile: USER?.sPhoneMobile || '',
            sPhoneBusiness: USER?.sPhoneBusiness || '',
            sArea: USER?.sArea || '',
            sCity: USER?.sCity || '',
            sAddress: USER?.sAddress || '',
        }
    })


    const handleModalCancel = () => {

        if (isDirty) {
            Alert.alert('Cancel Changes', 'Are you sure you want to discard changes made ?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => router.back() },
            ]);
        } else {
            router.back();
        }

    }
    const handleModalSave = () => {
        // Logic to save the edited contact
        router.back();
    }



    return (
        <ScrollView showsVerticalScrollIndicator={false} className='flex-1 '>
            <Text className='text-3xl text-green-600 ml-4 '>{iContactId}</Text>
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
                                title='Company'
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
    )
}

export default editContactModal