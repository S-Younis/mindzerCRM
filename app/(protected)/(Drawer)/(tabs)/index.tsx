import { Text, View, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import MindzerButton from '@/components/shared/MindzerButton';
import { useState } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import Spinner from '@/components/shared/Spinner';
import Toast from 'react-native-toast-message';
import ActivityCard from '@/components/activities/ActivityCard';

import { BarChart, PieChart } from 'react-native-chart-kit';
import { useColorScheme } from 'nativewind';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const { colorScheme } = useColorScheme();
  const user = useAuthStore(state => state.user);

  // Pichart data
  const data = [
    {
      name: 'USA',
      population: 21500000,
      color: '#00a444',
      legendFontColor: colorScheme == 'dark' ? '#d1d5db' : '#252525',
      legendFontSize: 15,
    },
    {
      name: 'Bahrain',
      population: 2800000,
      color: '#F00',
      legendFontColor: colorScheme == 'dark' ? '#d1d5db' : '#252525',
      legendFontSize: 15,
    },
    {
      name: 'France',
      population: 527612,
      color: '#1c3b8a',
      legendFontColor: colorScheme == 'dark' ? '#d1d5db' : '#252525',
      legendFontSize: 15,
    },
    {
      name: 'Japan',
      population: 8538000,
      color: '#ecc9a5',
      legendFontColor: colorScheme == 'dark' ? '#d1d5db' : '#252525',
      legendFontSize: 15,
    },
  ];
  const data2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" className="flex-1 px-4 pt-2">
      <View className="flex-row gap-2 mb-4 mt-4">
        <Text className={`text-2xl font-bold text-blue-900 dark:text-slate-200 `}>Welcome Back ,</Text>
        <Text className={`text-2xl font-bold text-blue-600 dark:text-blue-500 `}>{user?.name || 'Guest'}</Text>
      </View>

      {/* Year Selector */}
      {/* <TouchableOpacity className="mb-4 flex-row items-center justify-between bg-gray-100 px-4 py-3 rounded-lg border border-gray-300">
        <Text className="text-gray-700 text-base font-medium">Forecast 2025</Text>
      </TouchableOpacity> */}

      <View className="bg-blue-100 dark:bg-gray-800   px-3.5 py-1.5 rounded-full self-start mt-6 ">
        <Text className="text-blue-600 dark:text-gray-300 text-sm font-medium">Top Countries Opps</Text>
      </View>

      <View className="mt-3.5   gap-4 border rounded-xl bg-[#f3f4f6] dark:bg-[#161f2e]  border-blue-800/15  dark:border-[#262f3a]   ">
        <PieChart
          data={data}
          width={Dimensions.get('window').width - 50}
          height={180}
          chartConfig={chartConfig}
          style={{
            // marginVertical: 8,
            // borderRadius: 14,
            marginInline: 'auto',
            // borderColor: colorScheme == 'dark' ? '#262f3a' : '#e5e7eb',
            // borderWidth: 1,
          }}
          accessor={'population'}
          backgroundColor={colorScheme == 'dark' ? '#161f2e' : '#f3f4f6'}
          paddingLeft={'0'}

          // center={[10, 50]}
          // absolute
        />
      </View>

      <View className="bg-blue-100  dark:bg-gray-800  px-3.5 py-1.5 rounded-full self-start mt-6 ">
        <Text className="text-blue-600 dark:text-gray-300 text-sm font-medium">Top Countries Opps</Text>
      </View>

      <View className="mt-3.5 pt-3 pb-2  gap-4 border rounded-xl bg-[#f3f4f6] dark:bg-[#161f2e]  border-blue-800/15  dark:border-[#262f3a]   ">
        <BarChart
          // style={}
          data={data2}
          width={Dimensions.get('window').width - 50}
          height={220}
          yAxisLabel=""
          style={{
            paddingRight: 50,
          }}
          chartConfig={{
            backgroundColor: colorScheme == 'dark' ? '#161f2e' : '#f3f4f6',
            backgroundGradientFrom: colorScheme == 'dark' ? '#161f2e' : '#f3f4f6',
            backgroundGradientTo: colorScheme == 'dark' ? '#161f2e' : '#f3f4f6',
            labelColor: (opacity = 1) => {
              return colorScheme == 'dark' ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`;
            },
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            useShadowColorFromDataset: false, // optional
          }}
          // verticalLabelRotation={30}
          yAxisSuffix={''}
        />
      </View>

      <View className="bg-blue-100 dark:bg-gray-800  px-3.5 py-1.5 rounded-full self-start mt-6 ">
        <Text className="text-blue-600 dark:text-gray-300 text-sm font-medium">My Activities</Text>
      </View>

      {/* Activities */}
      <View className="mt-3.5  gap-4   ">
        <ActivityCard title={'Internal Meeting With Devs '} subTitle="Disccuss Further on project" status="Completed" date="Feb 12 , 2023" />
        <ActivityCard title={'Budgert Review Metting '} subTitle="Quaretley budger Review With Stackholder" status="Completed" date="Dec 15 , 2024" />
      </View>

      <MindzerButton
        isTitleCentered
        variants="primary"
        className="mt-8 mb-safe "
        onPress={() => {
          Toast.show({
            type: 'info',
            text1: 'Redirecting to Login',
            text2: 'Please wait a moment...',
          });
          setIsLoading(!isLoading);
        }}>
        {isLoading && <Spinner className="mr-3" />}
        <Text className={`font-medium  text-light`}>Go To Login</Text>
      </MindzerButton>
    </ScrollView>
  );
}
