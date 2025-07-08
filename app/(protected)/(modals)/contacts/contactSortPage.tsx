import ListOptionCheckBox from '@/components/shared/ListOptionCheckBox';
import Spinner from '@/components/shared/Spinner';
import { useContactTemplateStore } from '@/stores/contacts/contact.template.store';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const contactSortPage = () => {
  const sortType = useContactTemplateStore(state => state.sortType);
  const setSortType = useContactTemplateStore(state => state.setSortType);

  const [sortType_copy, setSortType_copy] = useState(sortType);
  const isNoneSelected = sortType_copy?.sortTitle ? false : true;

  const [isLoading, setIsLoading] = useState(false);

  const handleSaveBTN = () => {
    setSortType(sortType_copy);
    console.log('sortType_copy', sortType_copy);

    // Simulate Invalidating the query to refresh the contacts list (sorted)
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.back();
    }, 600);
  };
  const handleCancelBTN = () => {
    // detect if the user has changed the sortType
    if (sortType_copy?.sortTitle != sortType?.sortTitle) {
      Alert.alert('Cancel', 'Are you sure you want to cancel?', [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            setSortType_copy(null);
            router.back();
          },
        },
      ]);
    } else {
      router.back();
    }
  };
  const handleItemSelection = (title: string) => {
    if (title === 'none') {
      setSortType_copy(null);
      return;
    }
    setSortType_copy({ sortTitle: title, sortDirc: 'asc' });
  };
  return (
    <>
      {/* Dynamic Stack Header  */}
      <Stack.Screen
        options={{
          title: 'Sort By',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Text className="text-blue-400 text-xl" onPress={handleCancelBTN}>
              Cancel
            </Text>
          ),
          headerRight: () => (
            <Text disabled={isLoading} className={`text-blue-400  text-xl  `} onPress={handleSaveBTN}>
              {isLoading ? (
                <Animated.View entering={FadeIn.duration(300)}>
                  <Spinner />
                </Animated.View>
              ) : (
                'Save'
              )}
            </Text>
          ),
        }}
      />
      <View className="px-4 pt-2">
        <Text className=" text-gray-400  text-xs mt-4 mb-[6px] ml-3 ">Selected</Text>
        <View className={`bg-slate-200 rounded-xl dark:bg-[#161f2e] border-[#262f3a]  p-4 px-5  flex-row justify-between gap-4 h-[62px] `}>
          <View className="flex-row items-center gap-2">
            <Text className=" text-dark dark:text-light">{sortType_copy?.sortTitle || 'No Fields Selected'}</Text>
          </View>
          {!isNoneSelected && (
            <Animated.View entering={FadeIn.duration(200)}>
              <SegmentedControl
                style={{ width: 120, borderRadius: 8 }}
                values={['Asc', 'Desc']}
                fontStyle={{ color: '#f8f8f8', fontSize: 14, fontWeight: '400' }}
                backgroundColor="#33343E"
                sliderStyle={{ backgroundColor: '#6A6B75' }}
                selectedIndex={sortType_copy?.sortDirc == 'desc' ? 1 : 0}
                onChange={event => {
                  if (!sortType_copy) return;

                  if (event.nativeEvent.selectedSegmentIndex == 0) {
                    setSortType_copy({ ...sortType_copy, sortDirc: 'asc' });
                  } else {
                    setSortType_copy({ ...sortType_copy, sortDirc: 'desc' });
                  }
                }}
              />
            </Animated.View>
          )}
        </View>

        <Text className=" text-gray-400  text-xs mt-4 mb-[6px] ml-3 ">Select Field</Text>
        <ScrollView className="h-fit">
          <ListOptionCheckBox
            title="None"
            titleClassName="font-normal"
            isChecked={sortType_copy?.sortTitle ? false : true}
            onPress={() => handleItemSelection('none')}
            className="rounded-t-lg "
          />
          <ListOptionCheckBox
            title="Name"
            titleClassName="font-normal"
            isChecked={sortType_copy?.sortTitle == 'Name'}
            onPress={() => handleItemSelection('Name')}
            className=" "
          />
          <ListOptionCheckBox
            title="Email"
            titleClassName="font-normal"
            isChecked={sortType_copy?.sortTitle == 'Email'}
            onPress={() => handleItemSelection('Email')}
            className=" "
          />
          <ListOptionCheckBox
            title="Job Title"
            titleClassName="font-normal"
            isChecked={sortType_copy?.sortTitle == 'Job Title'}
            onPress={() => handleItemSelection('Job Title')}
            className=" rounded-b-lg !border-b-0"
          />
        </ScrollView>
      </View>
    </>
  );
};

export default contactSortPage;
