import ListOptionCheckBox from '@/components/shared/ListOptionCheckBox';
import Spinner from '@/components/shared/Spinner';
import { useContactTemplateStore } from '@/stores/contacts/contact.template.store';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { router, Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const contactSortPage = () => {
  const sortType = useContactTemplateStore(state => state.sortType);
  const setSortType = useContactTemplateStore(state => state.setSortType);

  const [sortType_copy, setSortType_copy] = useState(sortType);
  const isNoneSelected = sortType_copy?.sortTitle ? false : true;

  const [isLoading, setIsLoading] = useState(false);

  const { colorScheme } = useColorScheme(); // Auto-detect system color scheme

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
            <TouchableOpacity activeOpacity={0.6} onPress={handleCancelBTN}>
              <Text className=" text-white dark:text-blue-400 text-xl">Cancel</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity disabled={isLoading} activeOpacity={0.6} onPress={handleSaveBTN}>
              <Text disabled={isLoading} className={`text-white dark:text-blue-400  text-xl  `}>
                {isLoading ? (
                  <Animated.View entering={FadeIn.duration(300)}>
                    <Spinner />
                  </Animated.View>
                ) : (
                  'Save'
                )}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <View className="px-4 pt-2">
        <Text className=" text-gray-500 dark:text-gray-400  text-sm mt-4 mb-[6px] ml-3 ">Selected</Text>
        <View
          className={`bg-gray-100 rounded-xl border dark:border-0 border-gray-300/75 dark:bg-[#161f2e]  p-4 px-5  flex-row justify-between gap-4 h-[62px] `}>
          <View className="flex-row items-center gap-2">
            <Text className=" text-dark dark:text-light">{sortType_copy?.sortTitle || 'No Fields Selected'}</Text>
          </View>
          {!isNoneSelected && (
            <Animated.View entering={FadeIn.duration(200)}>
              <SegmentedControl
                style={{ width: 120, borderRadius: 8 }}
                values={['Asc', 'Desc']}
                fontStyle={{ color: colorScheme == 'light' ? '#252525' : '#f8f8f8', fontSize: 14, fontWeight: '400' }}
                backgroundColor={colorScheme == 'dark' ? '#33343E' : '#ededee'}
                sliderStyle={{ backgroundColor: colorScheme == 'dark' ? '#6A6B75' : '#fefefe' }}
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

        <Text className=" text-gray-500 dark:text-gray-400  text-sm mt-4 mb-[6px] ml-3 ">Select Field</Text>
        {/* <ScrollView className="h-fit bg-gray-100  border  border-gray-300/75 dark:border-0 rounded-xl"> */}
        <ListOptionCheckBox
          title="None"
          titleClassName="font-normal"
          isChecked={sortType_copy?.sortTitle ? false : true}
          onPress={() => handleItemSelection('none')}
          className="rounded-t-lg"
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
          className=" rounded-b-lg  !border-b-0"
        />
        {/* </ScrollView> */}
      </View>
    </>
  );
};

export default contactSortPage;
