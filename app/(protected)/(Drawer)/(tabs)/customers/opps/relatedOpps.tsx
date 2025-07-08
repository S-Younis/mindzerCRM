import SVGComponent from '@/assets/svg/SVGComponent';
import { lst_opps, lstOppStatus, lstProducts } from '@/constants/opps';
import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Animated, { FadeInUp, FadeOutDown, LinearTransition, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { OppCard } from '@/components/oppsPage/OppCard';

const RelatedOpps = () => {
  const [isEditingOpp, setIsEditingOpp] = useState(false);
  const [oppsData, setOppsData] = useState(lst_opps);
  /// Animating the comments delete
  const incrementalVlaue1 = useSharedValue(-30);
  const incrementalVlaue2 = useSharedValue(0);

  useEffect(() => {
    incrementalVlaue1.value = isEditingOpp ? withTiming(15, { duration: 200 }) : withTiming(-30, { duration: 200 });
    incrementalVlaue2.value = isEditingOpp ? withTiming(36, { duration: 200 }) : withTiming(0, { duration: 200 });
  }, [isEditingOpp]);

  const animatedDeleteIcon = useAnimatedStyle(() => ({
    transform: [{ translateX: incrementalVlaue1.value }],
  }));
  const animatedOppCard = useAnimatedStyle(() => ({
    transform: [{ translateX: incrementalVlaue2.value }],
  }));

  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
  //

  const handleOppDelete = (oppID: number) => {
    Alert.alert(
      'Delete Opportunity',
      'Are you sure you want to delete this Opportunity?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setOppsData(prev => prev.filter(opp => opp.iOpportunityId !== oppID));
            Toast.show({
              type: 'success',
              text1: 'Opportunity Deleted',
              text2: 'Opportunity Successfully Deleted.',
              position: 'top',
              visibilityTime: 2000,
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          title: '',
          headerRight: () => (
            <View className="flex-row items-center justify-end gap-6 w-28   ">
              <Text className="text-blue-400 text-lg h-full" onPress={() => setIsEditingOpp(prev => !prev)}>
                {isEditingOpp ? 'Done' : 'Edit'}
              </Text>
              <Text className="text-blue-400 text-lg h-full">Add</Text>
            </View>
          ),
        }}
      />
      <Text className="ml-5 text-sm text-gray-400 my-3 mt-4">Related Opps ( {oppsData.length} )</Text>
      {oppsData.length > 0 && (
        <Animated.FlatList
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          data={oppsData}
          itemLayoutAnimation={LinearTransition}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInUp} exiting={FadeOutDown} className="flex-row items-center  relative ">
              <AnimatedTouchableOpacity
                disabled={!item.bEr}
                style={animatedDeleteIcon}
                className={`absolute left-0 flex-row items-center h-full  z-30 ${item.bEr ? 'opacity-100' : 'opacity-25'} `}
                onPress={() => handleOppDelete(item.iOpportunityId)}>
                <Ionicons name="remove-circle-outline" size={22} color={item.bEr ? '#db2727' : 'grey'} />
              </AnimatedTouchableOpacity>

              <Animated.View className="flex-1" style={animatedOppCard}>
                <OppCard
                  onPress={() => {
                    router.push(`/customers/opps/${item.iOpportunityId}`);
                  }}
                  className={`${index == lst_opps.length - 1 ? 'mb-6' : ''} `}
                  sCustomer={item.sCustomer}
                  PRODUCT_NAME={lstProducts.find(prod => prod.iProductId == item.iProductId)?.sProduct || ''}
                  iOpportunityStatusId={item.iOpportunityStatusId}
                  STATUS={lstOppStatus.find(status => status.iOpportunityStatusId == item.iOpportunityStatusId)?.sStatus || ''}
                  sUserAppManager={item.sUserAppManager}
                />
              </Animated.View>
            </Animated.View>
          )}
          keyExtractor={item => item.iOpportunityId.toString()}
          // estimatedItemSize={80}
        />
      )}
      {oppsData.length == 0 && (
        <View className="flex-1 justify-center items-center p-8 gap-4">
          <SVGComponent />
          <Text className="text-md text-center mb-4 adaptive-text">No Related Opps</Text>
        </View>
      )}
    </View>
  );
};

export default RelatedOpps;
