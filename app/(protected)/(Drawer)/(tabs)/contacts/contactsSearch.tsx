import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CustomInput } from '@/components/shared/CustomInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { FlashList } from '@shopify/flash-list'
import { ContactCard } from '@/components/contactsPage/ContactCard'
import { contacts_lst } from '@/constants/contacts'

const contactsSearch = () => {

    const [filterValue, setFilterValue] = useState('');
    // const debouncedValue = useDebounce(filterValue, 300); // Debounce the input value to avoid excessive filtering
    const [filteredContacts, setFilteredContacts] = useState<any[]>([]);

    useEffect(() => {
        if (filterValue.trim() === '') {
            setFilteredContacts([]);
            return;
        }
        const temp = contacts_lst.filter((item) => {
            if (item.sFullName.toLowerCase().includes(filterValue.toLowerCase())) {
                return item;
            }
        })
        setFilteredContacts(temp)
    }, [filterValue]);


    // on Page show input focus
    const textInputRef = React.useRef<TextInput>(null);
    useEffect(() => {
        textInputRef.current && textInputRef.current.focus();
    }, []);

    return (
        <SafeAreaView className='pt-2 flex-1 ' >
            <View className='  pb-3 px-4  flex-row justify-between gap-[14px] items-center   border-t-0 border-x-0 border-b-2 border-gray-900 ' >
                <CustomInput ref={textInputRef} placeholder='Search' value={filterValue} containerClassName=' pl-4 pr-2 flex-1' onChangeText={(value) => setFilterValue(value)} clearButtonMode='while-editing' />
                <Text onPress={() => router.back()} className='text-blue-600  dark:text-blue-400 text-[16px] '>Cancel</Text>
            </View>

            <FlashList
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                ListHeaderComponent={() => <View className='px-6 mt-4 mb-2 h-5' >
                    {filterValue && <Text className={` text-gray-500 dark:text-gray-300 text-sm `} >Result ( {filteredContacts.length} )</Text>}
                </View>}
                data={filteredContacts}
                renderItem={({ item }) => <ContactCard sFullName={item.sFullName} sJobTitle={item.sJobTitle} sEmail={item.sEmail} onPress={() => { router.push(`/contacts/${item.iContactId}`) }} />}
                keyExtractor={(item) => item.iContactId.toString()}
                estimatedItemSize={80}
            />
        </SafeAreaView>
    )
}

export default contactsSearch