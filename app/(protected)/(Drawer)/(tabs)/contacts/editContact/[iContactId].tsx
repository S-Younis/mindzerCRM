import { View, Text, Alert, ScrollView } from 'react-native'
import { router, Stack, useLocalSearchParams } from 'expo-router';
import ListFormOption from '@/components/shared/ListFormOption';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { contacts_lst } from '@/constants/contacts';
import Toast from 'react-native-toast-message';
import MindzerButton from '@/components/shared/MindzerButton';

import { FormSchema, FormDataType } from '@/types/schemas/contact.sheme'


const editContactModal = () => {

    const { iContactId } = useLocalSearchParams();

    const USER = contacts_lst.find(contact => contact.iContactId === parseInt(iContactId as string));

    const {
        control,
        handleSubmit,
        // formState: {
        //     errors,
        // },
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
        if (control._getDirty()) {
            Alert.alert('Cancel Changes', 'Are you sure you want to discard changes made ?', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => router.back() },
            ]);
        } else {
            router.back();
        }
    }

    const handleSaveBTN = () => {

        const result = FormSchema.safeParse(control._formValues);

        if (result.success) {
            handleSubmit(handleModalSave)();
        } else {

            Alert.alert(
                'OPS !',
                `${result.error.errors[0].message}`,
                [{ text: 'OK', }]
            );
        }

    };

    const handleModalSave: SubmitHandler<FormDataType> = (data) => {
        // **** Clean Data only is Recived "validated values"  ****
        console.log('Form Data X:', data);
        // Your save logic here

        Toast.show(
            {
                type: 'success',
                text1: 'Success',
                text2: 'Contact Updated Successfully',
                position: 'top',
                visibilityTime: 2500,
                swipeable: true,
            }
        );
        router.back();
    };

    const handleContactDelete = () => {
        Alert.alert(
            'Delete Contact',
            'Are you sure you want to delete this contact?',
            [
                { text: 'Cancel', style: 'cancel', },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        // Your delete logic here
                        Toast.show({
                            type: 'success',
                            text1: 'Contact Deleted Successfully',
                            position: 'top',
                            visibilityTime: 2500,
                            swipeable: true,
                        });
                        router.navigate('/contacts');
                    },
                },
            ]
        );
    }
    return (
        <>
            {/* Dynamic Stack Header  */}
            <Stack.Screen options={{
                headerStyle: { backgroundColor: '#161f2e' },
                headerLeft: () => <Text className='text-blue-400 text-xl' onPress={handleModalCancel}>Cancel</Text>,
                headerRight: () => <Text className='text-blue-400  text-xl' onPress={handleSaveBTN} >Save</Text>,
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

                    <MindzerButton variants={'danger'} className='flex items-center justify-center mt-4' onPress={handleContactDelete}>
                        <Text className='text-white text-center'>Delete Contact</Text>
                    </MindzerButton>

                </View>
            </ScrollView>
        </>

    )
}

export default editContactModal