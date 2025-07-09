import { Alert, Platform, Text } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView, useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useCallback, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import MindzerButton from '../shared/MindzerButton';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { myDarkTheme } from '@/configs/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';

type BottomModalSheetProps = {
  ref?: React.RefObject<BottomSheetMethods | null>;
};

const BottomModalSheet = ({ ref }: BottomModalSheetProps) => {
  const { '1': setImage } = useState<string | null>(null);
  const { colorScheme } = useColorScheme(); // Auto-detect system color scheme

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => <BottomSheetBackdrop opacity={0.55} appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 180,
  });

  const showCreateContact = () => {
    router.navigate('/(modals)/contacts/createContact');
    // dismiss the bottom sheet
    ref?.current?.close();
  };

  const showImportPage = () => {
    router.push('/(modals)/contacts/importContactPage');
    ref?.current?.close();
  };

  const handleScanBusinessBTN = () => {
    ref?.current?.close();
    Alert.alert(
      'Scan Business Card ',
      'Select a method',
      [
        {
          text: 'Take Photo',
          onPress: () => handleScanOptions('capture'),
        },
        { text: 'Choose from library', onPress: () => handleScanOptions('picker') },
        Platform.OS === 'ios'
          ? {
              text: 'Cancel',
              style: 'cancel',
            }
          : false,
      ].filter(Boolean) as any,
      { cancelable: true }
    );
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log('Image selected:', result.assets[0].uri);
      router.push(`/(modals)/contacts/scan-business-card?imgSelected=${result.assets[0].uri}`);
    }
  };

  const handleScanOptions = async (option: 'capture' | 'picker') => {
    if (option === 'capture') {
      router.push('/(modals)/contacts/scan-business-card');
    } else if (option === 'picker') {
      await pickImage();
    }
  };

  return (
    <BottomSheet
      ref={ref}
      snapPoints={['20%']}
      backdropComponent={renderBackdrop}
      index={-1}
      animationConfigs={animationConfigs}
      backgroundStyle={{ backgroundColor: colorScheme === 'dark' ? myDarkTheme.colors.card : '#f9fafb' }}
      handleIndicatorStyle={{ backgroundColor: colorScheme === 'dark' ? '#D3D3D3' : '#DCDCDC' }}>
      <BottomSheetView className="flex gap-4 p-4 px-6   ">
        <MindzerButton isTitleCentered variants="primary" className="w-full" onPress={showCreateContact}>
          <AntDesign name="adduser" size={18} color="white" className="mr-2" />
          <Text className={`font-medium text-white `}>Create New Contact</Text>
        </MindzerButton>
        <MindzerButton isTitleCentered variants="primary" className="w-full" onPress={showImportPage}>
          <MaterialCommunityIcons name="import" size={19} className="mr-2" color="white" />
          <Text className={`font-medium text-white `}>Import from Phone Contacts</Text>
        </MindzerButton>

        <MindzerButton isTitleCentered variants="primary" className="w-full" onPress={handleScanBusinessBTN}>
          <MaterialCommunityIcons name="line-scan" size={19} className="mr-2" color="white" />
          <Text className={`font-medium text-white `}>Scan a Business Card</Text>
        </MindzerButton>

        <MindzerButton isTitleCentered variants="secondary" className="w-full my-2 mb-7 " onPress={() => ref?.current?.close()}>
          <Text className={`font-medium  text-gray-700 dark:text-white `}>Cancel</Text>
        </MindzerButton>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default BottomModalSheet;
