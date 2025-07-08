import { View, Text, Pressable, FlatList, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MindzerButton from '../shared/MindzerButton';
// import Toast from 'react-native-toast-message';
import { toast } from 'sonner-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { useState } from 'react';

const AttachmentsTab = () => {
  //
  const [attachments, setAttachments] = useState([
    { id: 1, name: 'Project_Specifications.pdf', type: 'pdf', size: '2.4 MB' },
    { id: 2, name: 'Budget_Chart.png', type: 'image', size: '1.8 MB' },
    { id: 4, name: 'Meeting_Notes.docx', type: 'word', size: '1.5 MB' },
    { id: 6, name: 'Design_Mockups.jpg', type: 'image', size: '2.0 MB' },
    { id: 11, name: 'Marketing_Strategy.pptx', type: 'powerpoint', size: '3.0 MB' },
    { id: 13, name: 'Client_Feedback.pdf', type: 'pdf', size: '1.7 MB' },
  ]);
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

  const handleCardPress = (attachmentID: string | number) => {
    Alert.alert(
      'Attachment Options',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Download Attachment',
        },
        {
          text: 'Delete Attachment',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Delete Attachment',
              'Are you sure you want to delete this Attachment?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => {
                    // Toast.show({
                    //   type: 'success',
                    //   text1: 'Attachment Deleted',
                    //   text2: 'Attachment Deleted Successfully.',
                    //   position: 'top',
                    //   visibilityTime: 2000,
                    // });
                    setAttachments(prev => prev.filter(attachment => attachment.id !== attachmentID));
                    toast.success('Attachment Deleted', {
                      position: 'top-center',
                      duration: 2000,
                    });
                  },
                },
              ],
              { cancelable: true }
            );
          },
        },
      ],
      { cancelable: true }
    );
  };
  const handleCardLongPress = (attachmentID: string | number) => {
    // if He have edit permission
    if (true) {
      Alert.alert(
        'Delete Attachment',
        'Are you sure you want to delete this Attachment?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              setAttachments(prev => prev.filter(attachment => attachment.id !== attachmentID));
              toast.success('Attachment Deleted', {
                position: 'top-center',
                duration: 2000,
              });
            },
          },
        ],
        { cancelable: true }
      );
    }
  };
  const handleUploadAttachment = () => {
    setAttachments([
      ...attachments,
      {
        id: Date.now(),
        name: 'New_Uploaded_File.pdf',
        type: 'pdf',
        size: '1.2 MB',
      },
    ]);
    toast.success('Attachment Uploaded Successfully', {
      position: 'top-center',
      duration: 2000,
    });
  };

  return (
    <View className="flex-1  ">
      {attachments.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500 text-lg">No Attachments </Text>
        </View>
      ) : (
        <Animated.FlatList
          itemLayoutAnimation={LinearTransition}
          className="mt-4 px-3 "
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          data={attachments}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleCardPress(item.id)}
              onLongPress={() => handleCardLongPress(item.id)}
              className={` bg-[#161f2e] border-[#262f3a] border flex-row gap-4 py-3 px-[14px]  w-[94%] mx-auto  rounded-xl  active:opacity-70   `}>
              <View className="justify-center items-center">{getIcon(item.type)}</View>
              <View className="flex-1">
                <Text className="text-light text-base font-medium mb-0.5">{item.name}</Text>
                <Text className="text-gray-500 text-sm">{item.size}</Text>
              </View>
            </Pressable>
          )}
          keyExtractor={item => item.id.toString()}
        />
      )}

      {/* Upload Button */}
      <MindzerButton
        onPress={handleUploadAttachment}
        style={{ marginBottom: bottom }}
        variants={'primary'}
        className="mt-6 mx-8 flex-row items-center justify-center">
        <Feather name="upload" size={20} color="#f8f8f8" />
        <Text className="ml-2 text-white  text-base font-semibold">Upload New File</Text>
      </MindzerButton>
    </View>
  );
};

export default AttachmentsTab;
