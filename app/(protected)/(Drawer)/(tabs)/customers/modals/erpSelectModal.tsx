import { View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

const ErpSelectModal = () => {
  return (
    <>
      <Stack.Screen
        options={{
          presentation: 'modal',
          title: 'ERP Customer',
        }}
      />
      <SafeAreaView className="flex-1 ">

      </SafeAreaView>
    </>
  );
};

export default ErpSelectModal;
