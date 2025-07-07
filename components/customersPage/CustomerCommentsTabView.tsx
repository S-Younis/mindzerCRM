import { View, Text, Pressable, TouchableOpacity, Alert } from 'react-native';
import { useColorScheme } from 'nativewind';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import CommentCard from '../shared/CommentCard';
import { comments } from '@/constants/customers';
import Animated, { LinearTransition, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

type CustomerCommentsTabViewProps = {
  isEditingComment: boolean;
};
const CustomerCommentsTabView = ({ isEditingComment }: CustomerCommentsTabViewProps) => {
  const { colorScheme } = useColorScheme();

  const [commentsData, setCommentsData] = useState(comments);

  /// Animating the comments delete
  const incrementalVlaue1 = useSharedValue(-30);
  const incrementalVlaue2 = useSharedValue(0);

  useEffect(() => {
    incrementalVlaue1.value = isEditingComment ? withTiming(0, { duration: 200 }) : withTiming(-30, { duration: 200 });
    incrementalVlaue2.value = isEditingComment ? withTiming(30, { duration: 200 }) : withTiming(0, { duration: 200 });
  }, [isEditingComment]);

  const animatedDeleteIcon = useAnimatedStyle(() => ({
    transform: [{ translateX: incrementalVlaue1.value }],
  }));
  const animatedCommentCard = useAnimatedStyle(() => ({
    transform: [{ translateX: incrementalVlaue2.value }],
  }));

  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
  ///

  const handleCommentDelete = (commentID: string) => {
    Alert.alert(
      'Delete Comment',
      'Are you sure you want to delete this comment?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setCommentsData(prevComments => prevComments.filter(comment => comment.id !== commentID));
            Toast.show({
              type: 'success',
              text1: 'Comment Deleted',
              text2: 'Comment Successfully Deleted.',
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
    <View className="px-4  mb-14 ">
      <View className="flex-row items-center gap-[4px] mt-4 mb-[6px] ml-3">
        <MaterialCommunityIcons name="comment-arrow-right-outline" size={10} color={colorScheme == 'dark' ? '#9ca3af' : 'black'} />
        <Text className=" text-gray-400  text-xs  ">Next Step</Text>
      </View>

      <Pressable
        onPress={() => router.push('customers/nextStepPage')}
        className="bg-[#161f2e] border border-[#262f3a]   flex-row justify-between items-center gap-[2px] w-[100%] p-4 rounded-lg ">
        <View className="flex-1">
          <Text className="adaptive-text">sadsad asd sad sa das ds a</Text>
        </View>
        <Entypo name="chevron-small-right" size={20} color={colorScheme == 'dark' ? '#f8f8f8' : 'black'} />
      </Pressable>

      <View className="flex-row items-center gap-[4px] mt-6 mb-[6px] ml-3">
        <MaterialCommunityIcons name="comment-outline" size={10} color={colorScheme == 'dark' ? '#9ca3af' : 'black'} />
        <Text className=" text-gray-400  text-xs  ">Comments</Text>
      </View>

      {/* Comments List */}
      <Animated.FlatList
        scrollEnabled={false}
        itemLayoutAnimation={LinearTransition}
        data={commentsData}
        renderItem={({ item: comment }) => (
          <Animated.View className="flex-row items-center gap-3 relative ">
            <AnimatedTouchableOpacity
              disabled={!comment.bEdit}
              style={animatedDeleteIcon}
              className={`absolute left-0 z-30 ${comment.bEdit ? 'opacity-100' : 'opacity-25'} `}
              onPress={() => handleCommentDelete(comment.id)}>
              <Ionicons name="remove-circle-outline" size={22} color={comment.bEdit ? '#db2727' : 'grey'} />
            </AnimatedTouchableOpacity>

            <Animated.View className="flex-1" style={animatedCommentCard}>
              <CommentCard
                onLongPress={() => comment.bEdit && handleCommentDelete(comment.id)}
                sUser={comment.iUser}
                sComment={comment.sComment}
                dateCreated={comment.date}
                onPress={() => router.push(`customers/comments/${comment.id}`)}
              />
            </Animated.View>
          </Animated.View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default CustomerCommentsTabView;
