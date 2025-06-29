import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

const OppDetails = () => {
  const { iOpportunityId } = useLocalSearchParams();
  return (
    <View className='flex-1 items-center justify-center '>
      <Text className='adaptive-text'>OppDetails of {iOpportunityId as string}</Text>
    </View>
  );
};

export default OppDetails;
