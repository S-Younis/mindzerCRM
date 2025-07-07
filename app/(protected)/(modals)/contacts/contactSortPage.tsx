import ListOptionCheckBox from '@/components/shared/ListOptionCheckBox';
import { useContactStore } from '@/stores/contacts/contact.store';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const contactSortPage = () => {
  const [selectedTabIndx, setSelectedTabIndx] = useState(0);
  const { sortByTitle, setSortByTitle } = useContactStore();

  const handleSaveBTN = () => {
    router.back();
  };
  const handleCancelBTN = () => {
    if (sortByTitle != 'None') {
      Alert.alert('Cancel', 'Are you sure you want to cancel?', [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            setSortByTitle('None');
            router.back();
          },
        },
      ]);
    } else {
      router.back();
    }
  };
  const handleItemSelection = (title: string) => {
    if (sortByTitle === title) {
      setSortByTitle('None');
      return;
    }
    setSortByTitle(title);
  };
  return (
    <>
      {/* Dynamic Stack Header  */}
      <Stack.Screen
        options={{
          title: '',
          //   headerStyle: { backgroundColor: '#161f2e' },
          headerLeft: () => (
            <Text className="text-blue-400 text-xl" onPress={handleCancelBTN}>
              Cancel
            </Text>
          ),
          headerRight: () => (
            <Text className="text-blue-400  text-xl" onPress={handleSaveBTN}>
              Save
            </Text>
          ),
        }}
      />
      <View className="px-4 pt-2">
        <Text className=" text-gray-400  text-xs mt-4 mb-[6px] ml-3 ">Selected</Text>
        <View className={`bg-slate-200 rounded-xl dark:bg-[#161f2e] border-[#262f3a]  p-4 px-5  flex-row justify-between gap-4 h-[62px] `}>
          <View className="flex-row items-center gap-2">
            <Text className=" text-dark dark:text-light">{sortByTitle}</Text>
          </View>
          {sortByTitle != 'None' && (
            <Animated.View entering={FadeIn.duration(200)}>
              <SegmentedControl
                style={{ width: 120, borderRadius: 8 }}
                values={['Asc', 'Desc']}
                fontStyle={{ color: '#f8f8f8', fontSize: 14, fontWeight: '400' }}
                backgroundColor="#33343E"
                sliderStyle={{ backgroundColor: '#6A6B75' }}
                selectedIndex={selectedTabIndx}
                onChange={event => {
                  setSelectedTabIndx(event.nativeEvent.selectedSegmentIndex);
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
            isChecked={sortByTitle == 'None'}
            onPress={() => handleItemSelection('None')}
            className="rounded-t-lg "
          />
          <ListOptionCheckBox
            title="Name"
            titleClassName="font-normal"
            isChecked={sortByTitle == 'Name'}
            onPress={() => handleItemSelection('Name')}
            className=" "
          />
          <ListOptionCheckBox
            title="Email"
            titleClassName="font-normal"
            isChecked={sortByTitle == 'Email'}
            onPress={() => handleItemSelection('Email')}
            className=" "
          />
          <ListOptionCheckBox
            title="Job Title"
            titleClassName="font-normal"
            isChecked={sortByTitle == 'Job Title'}
            onPress={() => handleItemSelection('Job Title')}
            className=" rounded-b-lg !border-b-0"
          />
        </ScrollView>
      </View>
    </>
  );
};

export default contactSortPage;
