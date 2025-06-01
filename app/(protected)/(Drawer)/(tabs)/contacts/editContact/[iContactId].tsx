import { View, Text, Alert } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import ListFormOption from '@/components/shared/ListFormOption';
const editContactModal = () => {

    const { iContactId } = useLocalSearchParams();
    const { setOptions } = useNavigation();

    useLayoutEffect(() => {
        setOptions({
            headerLeft: () => <Text className='text-blue-400 text-lg' onPress={handleModalCancel}>Cancel</Text>,
            headerRight: () => <Text className='text-blue-400  text-lg' onPress={handleModalSave} >Save</Text>,
        });
    }, []);

    const isFormTouched = true;

    const handleModalCancel = () => {

        if (isFormTouched) {
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
        <View className='flex-1 '>
            <Text className='text-3xl text-green-600 ml-4'>{iContactId}</Text>
            <View className='px-3 gap-4 mb-6'>
                <View>
                    <Text className=' text-gray-400  text-xs mt-4 mb-[6px] ml-3 '>Personal Details</Text>

                    <ListFormOption title='Company' value={'sd'} titleMarginLeft={4} className='rounded-tr-lg rounded-tl-lg '  >
                        {/* <FontAwesome6 name="building-user" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} /> */}
                    </ListFormOption>

                    <ListFormOption title='Job Title' value={'sd'} titleMarginLeft={4}  >
                        {/* <Entypo name="suitcase" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} /> */}
                    </ListFormOption>


                    <ListFormOption title='Private ( Limited Visibiliy )' value={'sd'} titleMarginLeft={4} className='rounded-br-lg rounded-bl-lg '  >
                        {/* <MaterialCommunityIcons name="account-eye" size={18} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} /> */}
                    </ListFormOption>

                </View>
                {/* Address Section */}
                <View>
                    <Text className=' text-gray-400 text-xs mt-2 mb-[6px] ml-3 '>Address</Text>

                    <ListFormOption title='Country' value={'sd'} titleMarginLeft={4} className='rounded-tr-lg rounded-tl-lg '  >
                        {/* <Ionicons name="location-sharp" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} /> */}
                    </ListFormOption>

                    <ListFormOption title='City' value={'sd'} titleMarginLeft={4}  >
                        {/* <MaterialCommunityIcons name="home-city-outline" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} /> */}
                    </ListFormOption>


                    <ListFormOption title='Full Address' value={'sd'} titleMarginLeft={4} className='rounded-br-lg rounded-bl-lg min-h-16 '  >
                        {/* <Entypo name="address" size={16} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} /> */}
                    </ListFormOption>

                </View>
            </View>
        </View>
    )
}

export default editContactModal