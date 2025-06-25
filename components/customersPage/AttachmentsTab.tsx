import { View, Text, ScrollView, Pressable, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MindzerButton from '../shared/MindzerButton';
import { FlashList } from '@shopify/flash-list';
import { Stack } from 'expo-router';

const attachments = [
  { id: 1, name: 'Project_Specifications.pdf', type: 'pdf', size: '2.4 MB' },
  { id: 2, name: 'Budget_Chart.png', type: 'image', size: '1.8 MB' },
  { id: 3, name: 'Financial_Report.xlsx', type: 'excel', size: '3.2 MB' },
  { id: 4, name: 'Meeting_Notes.docx', type: 'word', size: '1.5 MB' },
  { id: 5, name: 'Presentation_Slides.pptx', type: 'powerpoint', size: '4.0 MB' },
  { id: 6, name: 'Design_Mockups.jpg', type: 'image', size: '2.0 MB' },
  { id: 7, name: 'Contract_Agreement.pdf', type: 'pdf', size: '3.5 MB' },
  { id: 8, name: 'Invoice_12345.pdf', type: 'pdf', size: '1.2 MB' },
  { id: 9, name: 'User_Guide.pdf', type: 'pdf', size: '2.8 MB' },
  { id: 10, name: 'Project_Plan.docx', type: 'word', size: '1.0 MB' },
  { id: 11, name: 'Marketing_Strategy.pptx', type: 'powerpoint', size: '3.0 MB' },
  { id: 12, name: 'Data_Analysis.xlsx', type: 'excel', size: '2.5 MB' },
  { id: 13, name: 'Client_Feedback.pdf', type: 'pdf', size: '1.7 MB' },
  { id: 14, name: 'Client_Feedback2.pdf', type: 'pdf', size: '1.7 MB' },
];

const AttachmentsTab = () => {
  const { bottom } = useSafeAreaInsets();
  const getIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Ionicons name="image-outline" size={24} color="#d1d5db" />;
      case 'pdf':
        <Ionicons name="document-text-outline" size={24} color="#EF4444" />;
      default:
        return <Ionicons name="attach-sharp" size={25} color="#d1d5db" />;
    }
  };

  return (
    <View className="flex-1  ">
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'ss',
          headerSearchBarOptions: {
            placeholder: 'Search attachments...',
            hideWhenScrolling: true,
            onChangeText: e => {
              console.log('Search text:', e.nativeEvent.text);
            },
          },
        }}
      />
      {/* Attachments List */}
      <FlatList
        className="mt-6"
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        data={attachments}
        renderItem={({ item }) => (
          <Pressable className={` bg-[#161f2e] border-[#262f3a] border flex-row gap-4 py-3 px-[14px]  w-[94%] mx-auto  rounded-xl  active:opacity-70   `}>
            <View className="justify-center items-center">{getIcon(item.type)}</View>
            <View className="flex-1">
              <Text className="text-light text-base font-medium mb-0.5">{item.name}</Text>
              <Text className="text-gray-500 text-sm">{item.size}</Text>
            </View>
          </Pressable>
        )}
        keyExtractor={item => item.id.toString()}
      />

      {/* Upload Button */}
      <MindzerButton style={{ marginBottom: bottom }} variants={'primary'} className="mt-6 mx-4 flex-row items-center justify-center">
        {/* <Feather name="upload" size={20} color="#2563EB" /> */}
        <Feather name="upload" size={20} color="#f8f8f8" />
        <Text className="ml-2 text-white  text-base font-semibold">Upload New File</Text>
      </MindzerButton>
    </View>
  );
};

export default AttachmentsTab;
