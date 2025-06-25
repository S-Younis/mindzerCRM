import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import MindzerButton from '@/components/shared/MindzerButton';
import { useState } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import Spinner from '@/components/shared/Spinner';
import Toast from 'react-native-toast-message';
import AntDesign from '@expo/vector-icons/AntDesign';
export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const user = useAuthStore(state => state.user);

  // Forecast data
  const forecastData = {
    annualConsumption: { value: 12, unit: 'Each' },
    maxPotentialShare: { value: 11, unit: 'Each' },
    maxPotentialSharePercent: { value: 91.67, unit: '%' },
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" className="flex-1 px-4 pt-2">
      {/* <Text className={`text-2xl font-bold text-blue-800 dark:text-slate-200 mb-10`}>Welcome , {user?.name || 'Guest'}</Text> */}

      {/* Year Selector */}
      <TouchableOpacity className="mb-4 flex-row items-center justify-between bg-gray-100 px-4 py-3 rounded-lg border border-gray-300">
        <Text className="text-gray-700 text-base font-medium">Forecast 2025</Text>
      </TouchableOpacity>

      <View className="bg-blue-100 px-3 py-1.5 rounded-full self-start mb-4">
        <Text className="text-blue-600 text-xs font-semibold">FORECAST 2025</Text>
      </View>
      {/* Forecast Metrics */}
      <View className="bg-white p-5 rounded-xl mb-5 border border-[#E5E7EB]">
        <View className="flex-col justify-between gap-4">
          <View>
            <Text className="text-gray-500 text-sm mb-1">Annual Consumption</Text>
            <Text className="text-gray-900 text-base font-semibold">
              {forecastData.annualConsumption.value} {forecastData.annualConsumption.unit}
            </Text>
          </View>
          <View>
            <Text className="text-gray-500 text-sm mb-1">Our Maximum Potential Share</Text>
            <Text className="text-gray-900 text-base font-semibold">
              {forecastData.maxPotentialShare.value} {forecastData.maxPotentialShare.unit}
            </Text>
          </View>
          <View>
            <Text className="text-gray-500 text-sm mb-1">Our Maximum Potential Share %</Text>
            <Text className="text-gray-900 text-base font-semibold">
              {forecastData.maxPotentialSharePercent.value} {forecastData.maxPotentialSharePercent.unit}
            </Text>
          </View>
        </View>
      </View>

      {/* Input Form */}
      <View className="bg-white p-5 rounded-xl mb-5 border border-gray-200">
        <View className="mb-5">
          <Text className="text-gray-700 text-sm font-medium mb-2">Average Selling Price</Text>
          <View className="flex-row items-center">
            <TextInput
              className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-3 py-3 text-base text-gray-900"
              // value={averageSellingPrice}
              // onChangeText={setAverageSellingPrice}
              keyboardType="numeric"
              placeholder="0"
            />
            <TouchableOpacity className="flex-row items-center bg-gray-100 px-3 py-3 rounded-xl  ml-2 border border-gray-300">
              <Text className="text-gray-700 text-sm mr-1">$</Text>
              {/* <ChevronDown size={16} color="#6B7280" /> */}
            </TouchableOpacity>
          </View>
        </View>

        <View className="mb-5">
          <Text className="text-gray-700 text-sm font-medium mb-2">Gross Margin</Text>
          <TextInput
            className="bg-gray-50 border border-gray-300 rounded-xl px-3 py-3 text-base text-gray-900"
            // value={grossMargin}
            // onChangeText={setGrossMargin}
            keyboardType="numeric"
            placeholder="0.0 %"
          />
        </View>

        <View className="mb-5">
          <Text className="text-gray-700 text-sm font-medium mb-2">Expected Sales Quantity</Text>
          <View className="flex-row items-center">
            <TextInput
              className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-3 py-3 text-base text-gray-900"
              // value={expectedSalesQuantity}
              // onChangeText={setExpectedSalesQuantity}
              keyboardType="numeric"
              placeholder="0"
            />
            <View className="bg-gray-100 px-3 py-3 rounded-xl ml-2 border border-gray-300">
              <Text className="text-gray-700 text-sm">Each</Text>
            </View>
          </View>
          <Text className="text-gray-500 text-xs mt-1">23 Out of 111</Text>
          <Text className="text-gray-500 text-xs mt-1">Of Our Maximum Potential Share = 23 %</Text>
        </View>
      </View>

      <View className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <View className="bg-gray-50 px-5 py-4 border-b border-gray-200">
          <Text className="text-gray-700 text-base font-semibold">📊 Calculation</Text>
        </View>

        <View className="p-5 border-b border-gray-100">
          <Text className="text-gray-500 text-xs font-semibold mb-3 tracking-wider">POTENTIAL VALUES</Text>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-700 text-sm">Sales Amount</Text>
            <Text className="text-gray-900 text-sm font-semibold">23 $</Text>
          </View>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-700 text-sm">Gross Margin</Text>
            <Text className="text-gray-900 text-sm font-semibold">23 $</Text>
          </View>
        </View>

        <View className="p-5">
          <Text className="text-gray-500 text-xs font-semibold mb-3 tracking-wider">EXPECTED VALUES</Text>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-700 text-sm">Sales Amount</Text>
            <Text className="text-gray-900 text-sm font-semibold">23 $</Text>
          </View>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-700 text-sm">Gross Margin</Text>
            <Text className="text-gray-900 text-sm font-semibold">23 $</Text>
          </View>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-700 text-sm">Sales Quantity</Text>
            <Text className="text-blue-600 text-sm font-semibold">23 Each</Text>
          </View>
        </View>
      </View>

      {/* Activities */}
      <View className="mt-4 bg-white rounded-xl border  border-gray-200">
        <View className="flex-row items-start p-4 border-b border-gray-100">
          <View className="mr-3 mt-[2px]">
            <AntDesign name="checkcircleo" size={18} color="#10B981" />
          </View>
          <View className="flex-1">
            <Text className="text-gray-900 text-base font-semibold mb-1">Budgert Review Metting </Text>
            <Text className="text-gray-500 text-sm mb-2">Quaretley budger Review With Stackholder</Text>
            <View className="flex-row justify-between items-center">
              <Text className="text-xs font-semibold text-green-500">Completed</Text>
              <Text className="text-gray-400 text-xs">Due: Dec 15 , 2024</Text>
            </View>
          </View>
        </View>

        <View className="flex-row items-start p-4 border-b border-gray-100">
          <View className="mr-3 mt-[2px]">
            <AntDesign name="checkcircleo" size={18} color="#10B981" />
          </View>
          <View className="flex-1">
            <Text className="text-gray-900 text-base font-semibold mb-1">Budgert Review Metting </Text>
            <Text className="text-gray-500 text-sm mb-2">Quaretley budger Review With Stackholder</Text>
            <View className="flex-row justify-between items-center">
              <Text className="text-xs font-semibold text-green-500">Completed</Text>
              <Text className="text-gray-400 text-xs">Due: Dec 15 , 2024</Text>
            </View>
          </View>
        </View>

        <View className="flex-row items-start p-4 border-b border-gray-100">
          <View className="mr-3 mt-[2px]">
            <AntDesign name="checkcircleo" size={18} color="#10B981" />
          </View>
          <View className="flex-1">
            <Text className="text-gray-900 text-base font-semibold mb-1">Budgert Review Metting </Text>
            <Text className="text-gray-500 text-sm mb-2">Quaretley budger Review With Stackholder</Text>
            <View className="flex-row justify-between items-center">
              <Text className="text-xs font-semibold text-green-500">Completed</Text>
              <Text className="text-gray-400 text-xs">Due: Dec 15 , 2024</Text>
            </View>
          </View>
        </View>
      </View>

      <MindzerButton
        isTitleCentered
        variants="primary"
        className="mt-4"
        onPress={() => {
          Toast.show({
            type: 'info',
            text1: 'Redirecting to Login',
            text2: 'Please wait a moment...',
          });
          setIsLoading(!isLoading);
        }}>
        {isLoading && <Spinner />}
        <Text className={`font-medium  text-light`}>Go To Login</Text>
      </MindzerButton>
    </ScrollView>
  );
}
