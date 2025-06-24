import { View, Text, TextInput, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CustomInput } from '@/components/shared/CustomInput';
import { router, Stack } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import axios from 'redaxios';
import { useDebounce } from '@/hooks/util/useDebounce';
import { SafeAreaView } from 'react-native-safe-area-context';
type res = {
  posts: any[];
  total: number;
};
const OppsSearch = () => {
  const [filterValue, setFilterValue] = useState('');
  const { debouncedValue, isDebouncing } = useDebounce(filterValue, 900); // Debounce the input value to avoid excessive filtering

  const { data, isLoading } = useQuery<res>({
    queryKey: ['posts', debouncedValue],
    queryFn: async () => {
      const res = await axios.get(`https://dummyjson.com/posts/search?q=${debouncedValue}`);
      return res.data;
    },
    staleTime: 1000 * 20, // Time The data will be considered fresh (new , or updated ) till then it will not refetch and use the cache
    enabled: !!debouncedValue,
  });

  // on Page show input focus
  const textInputRef = React.useRef<TextInput>(null);
  useEffect(() => {
    textInputRef.current && textInputRef.current.focus();
  }, []);

  return (
    <SafeAreaView className=" flex-1  ">
      <Stack.Screen
        options={{
          animation: 'fade',
          animationDuration: 300,
        }}
      />
      <View className=" mt-2 pb-3 px-4  flex-row justify-between gap-[14px] items-center   border-t-0 border-x-0 border-b border-gray-900 ">
        <CustomInput
          ref={textInputRef}
          placeholder="Search"
          value={filterValue}
          containerClassName=" pl-4 pr-2 flex-1"
          onChangeText={value => setFilterValue(value)}
          clearButtonMode="while-editing"
        />
        <Text onPress={() => router.back()} className="text-blue-600  dark:text-blue-400 text-[16px] ">
          Cancel
        </Text>
      </View>

      {(isLoading || isDebouncing) && (
        <View className="flex-1 mt-10 items-center gap-3">
          <ActivityIndicator size="small" />
          <Text className="text-gray-500 dark:text-gray-300">Loading</Text>
        </View>
      )}

      {data?.total == 0 && !isLoading && !isDebouncing && filterValue.length > 0 && (
        <View className="flex-1 mt-10 items-center gap-3">
          <Text className="text-gray-500 dark:text-gray-300">No results found</Text>
        </View>
      )}

      {data && data.total > 0 && !isDebouncing && filterValue && (
        <FlashList
          extraData={data.posts}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListHeaderComponent={() => (
            <View className="px-6 mt-4 mb-2 h-5">
              <Text className={` text-gray-500 dark:text-gray-300 text-sm `}>Result ( {data.total} )</Text>
            </View>
          )}
          data={data.posts}
          renderItem={({ item }) => (
            <View className="h-32 bg-gray-500 p-4 mx-6 rounded-lg gap-2 items-center justify-center">
              <Text className="text-blue-400 text-lg">{item.title} </Text>
              <Text className="text-blue-400 text-lg">
                {item.views} - {item.id}
              </Text>
            </View>
          )}
          keyExtractor={item => item.id}
          estimatedItemSize={80}
        />
      )}
    </SafeAreaView>
  );
};

export default OppsSearch;
