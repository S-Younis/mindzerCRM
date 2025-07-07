import { View, TouchableOpacity, Pressable, Text, RefreshControl, ActivityIndicator } from 'react-native';
import BottomModalSheet from '@/components/customersPage/BottomModalSheet';
import { useCallback, useEffect, useRef, useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import BottomSheet from '@gorhom/bottom-sheet';
import { myLightTheme } from '@/configs/theme';
import { FontAwesome } from '@expo/vector-icons';
import { lst_opps, lstProducts, lstOppStatus } from '@/constants/opps';
import { useColorScheme } from 'nativewind';
import { myDarkTheme } from '@/configs/theme';
import { router } from 'expo-router';
import { useContactStore } from '@/stores/contacts/contact.store';
import Animated, { FadeIn } from 'react-native-reanimated';
import { OppCard } from '@/components/opportunitites/OppCard';
import { FlashList } from '@shopify/flash-list';

export default function customers() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { colorScheme } = useColorScheme();
  const sortByTitle = useContactStore(state => state.sortByTitle);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  }, []);

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

  return (
    <>
      <Animated.View entering={FadeIn.duration(200)} className="flex-1 ">
        <View
          className={`h-14 flex-row items-center justify-between border border-t-0 border-x-0 border-gray-800  pl-6 pr-5   ${
            colorScheme == 'dark' ? myDarkTheme.colors.card : '#fafafa'
          } border`}>
          <Text className="text-md text-light  ">Opps ( 23 ) </Text>
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
            data={lst_opps}
            extraData={lst_opps}
            renderItem={({ item }) => {
              return (
                <OppCard
                  sCustomer={item.sCustomer}
                  PRODUCT_NAME={lstProducts.find(prod => prod.iProductId == item.iProductId)?.sProduct || ''}
                  STATUS={lstOppStatus.find(status => status.iOpportunityStatusId == item.iOpportunityStatusId)?.sStatus || ''}
                  sUserAppManager={item.sUserAppManager}
                  iOpportunityStatusId={item.iOpportunityStatusId}
                  onPress={() => {
                    router.push(`/opportunities/${item.iOpportunityId}`);
                  }}
                />
              );
            }}
            // ListFooterComponent={() => (isFetchingNextPage ? <ActivityIndicator className="mb-4 mt-2" size={'small'} /> : null)}
            // onEndReachedThreshold={0.01}
            // onEndReached={handleListOnEndReached}
            keyExtractor={item => item.iOpportunityId.toString()}
            estimatedItemSize={85}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        }

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
