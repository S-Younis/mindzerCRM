import { Text, View } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { forwardRef, useCallback } from "react";
import MindzerButton from "../shared/MindzerButton";
import Toast from "react-native-toast-message";
import AntDesign from '@expo/vector-icons/AntDesign';

type Ref = BottomSheet;



const BottomModalSheet = forwardRef<Ref, any>((props, ref) => {
  const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, [])

  const handleLogoutBTN = () => {
    // dismiss the bottom sheet
    ref?.current?.close()

    Toast.show({
      type: 'success',
      text1: 'Successfully Logged Out',
      position: 'top',
      visibilityTime: 1500,
      swipeable: true,
    })
  }

  return (
    <BottomSheet
      ref={ref}
      // snapPoints={['10%']}
      snapPoints={['20%']}
      backdropComponent={renderBackdrop}
      index={-1}
    >
      <BottomSheetView className="flex gap-4 p-4   " >

        <MindzerButton isTitleCentered variants='danger' className="w-full" onPress={handleLogoutBTN}  >
          <View className='max-w-5 max-h-5 flex-row items-center mr-2'>
            <AntDesign name="logout" size={16} color={'white'} />
          </View>
          <Text className={`font-medium  text-white `}>
            Logout
          </Text>
        </MindzerButton>
        <MindzerButton isTitleCentered variants='secondary' className="w-full " onPress={() => ref?.current?.close()}   >
          <Text className={`font-medium  text-black `}>
            Cancel
          </Text>
        </MindzerButton>
      </BottomSheetView>
    </BottomSheet>
  );
}
);



export default BottomModalSheet;