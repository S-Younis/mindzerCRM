import { View, TouchableOpacity, Pressable, Text, RefreshControl, ActivityIndicator } from 'react-native';
import BottomModalSheet from '@/components/customersPage/BottomModalSheet';
import { useCallback, useEffect, useRef, useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import BottomSheet from '@gorhom/bottom-sheet';
import { myLightTheme } from '@/configs/theme';
import { FlashList } from '@shopify/flash-list';
import { FontAwesome } from '@expo/vector-icons';
import { lst_customers } from '@/constants/customers';
import { useColorScheme } from 'nativewind';
import { myDarkTheme } from '@/configs/theme';
import { router } from 'expo-router';
import { useContactStore } from '@/stores/contacts/contact.store';
import SVGComponent from '@/assets/svg/SVGComponent';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'redaxios';

export default function customers() {
  // Refs
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { colorScheme } = useColorScheme();
  const sortByTitle = useContactStore(state => state.sortByTitle);

  const [refreshing, setRefreshing] = useState(false);

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 0 }) => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      const response = await axios.get(`https://dummyjson.com/posts?limit=10&skip=${pageParam}`);
      return response.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.posts.length == 0 ? undefined : lastPage.skip + 10;
    },
  });

  useEffect(() => {
    console.log('Data fetched:', data);
  }, [data]);

  const totalPosts = data?.pages[0].total;
  // Flatten all posts from all pages
  const allPosts = data?.pages.flatMap(page => page.posts) || [];
  // console.log('All posts:', allPosts);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  }, []);

  const handleListOnEndReached = () => {
    if (!hasNextPage && isLoading) return;
    fetchNextPage();
  };

  // Loading UI Elements
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
    }, 400);
  }, []);

  if (!showContent) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colorScheme == 'dark' ? myDarkTheme.colors.primary : myLightTheme.colors.primary} />
      </View>
    );
  }
  // End Loading

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-500">Loading ....</Text>
      </View>
    );
  }
  return (
    <>
      <Animated.View entering={FadeIn.duration(200)} className="flex-1 ">
        <View
          className={`h-14 flex-row items-center justify-between border border-t-0 border-x-0 border-gray-800  pl-6 pr-5   ${
            colorScheme == 'dark' ? myDarkTheme.colors.card : '#fafafa'
          } border`}>
          <Text className="text-md text-light  ">Opps ( {totalPosts} ) </Text>
          <Pressable
            onPress={() => router.push('/contacts/contactSortPage')}
            className={`flex-row items-center justify-center gap-[2px] p-1 px-2 bg-[#161f2e] border-gray-800 border-[1px]  rounded-full active:opacity-70  `}>
            <FontAwesome className=" mb-1 ml-1" name="sort-desc" size={14} color="#fafafa" />
            <Text className="text-sm adaptive-text "> {sortByTitle == 'None' ? `Sort By Field` : ` Sort By : ${sortByTitle}`} </Text>
          </Pressable>
        </View>

        {
          <FlashList
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            data={allPosts} // Flatten the array of pages
            extraData={allPosts}
            renderItem={({ item }) => {
              return (
                <View className="h-32 bg-gray-500 p-4 mx-6 rounded-lg gap-2 items-center justify-center">
                  <Text className="text-blue-400 text-lg">{item.title} </Text>
                  <Text className="text-blue-400 text-lg">
                    {item.views} - {item.id}
                  </Text>
                </View>
              );
            }}
            ListFooterComponent={() => (isFetchingNextPage ? <ActivityIndicator className="mb-4 mt-2" size={'small'} /> : null)}
            onEndReachedThreshold={0.01}
            onEndReached={handleListOnEndReached}
            keyExtractor={item => item.id.toString()}
            estimatedItemSize={95}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        }
        {lst_customers.length == 0 && (
          <View className="flex-1 justify-center items-center p-8 gap-4">
            <SVGComponent />
            <Text className="text-md text-center mb-4 adaptive-text">No Contacts</Text>
          </View>
        )}

        {/* Floating Action Button */}
        <TouchableOpacity
          className="shadow-md"
          style={{
            position: 'absolute',
            bottom: 20,
            right: 24,
            backgroundColor: myLightTheme.colors.primary,
            width: 56,
            height: 56,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => bottomSheetRef.current?.expand()}>
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
      {/* Bottom Sheet for Add Customer */}
      <BottomModalSheet ref={bottomSheetRef} />
    </>
  );
}
