import { Camera, CameraView } from 'expo-camera';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Linking, Pressable, StyleSheet, View, Text } from 'react-native';
import { Image } from 'expo-image';
import MindzerButton from '@/components/shared/MindzerButton';
import Animated, { FadeIn } from 'react-native-reanimated';
import FontAwesome6 from '@expo/vector-icons/build/FontAwesome6';

export default function CameraScan() {
  //
  const ref = useRef<CameraView>(null);
  const { imgSelected } = useLocalSearchParams<{ imgSelected: string }>();

  const [uri, setUri] = useState<string>(imgSelected || '');

  useEffect(() => {
    const handleCameraPermissions = async () => {
      const { status } = await Camera.getCameraPermissionsAsync();

      if (status != 'granted') {
        Alert.alert('Permission Required', 'Camera access is needed to use this feature . Go to the settings to enable it.', [
          { text: 'Cancel', onPress: () => router.back() },
          {
            text: 'Open Settings',
            onPress: () => {
              Linking.openSettings();
            },
          },
        ]);
      }
    };
    if (!imgSelected) {
      handleCameraPermissions();
    }
  }, []);

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    setUri(photo?.uri || '');
  };

  const renderPicture = () => {
    return (
      <Animated.View entering={FadeIn.duration(900)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={{ uri }} contentFit="contain" style={{ width: 500, aspectRatio: 1 }} />

        <View className="flex flex-row items-center mt-6 relative ">
          {!imgSelected && (
            <Pressable onPress={() => setUri('')} className="absolute top-8 -left-14">
              <FontAwesome6 name="rotate-left" size={20} color="white" />
            </Pressable>
          )}
          <MindzerButton variants={'primary'} className="w-52 mt-4 self-center ">
            <Text className="text-light mx-auto ">Continue</Text>
          </MindzerButton>
        </View>
      </Animated.View>
    );
  };

  const renderCamera = () => {
    return (
      <CameraView style={styles.camera} ref={ref} mode={'picture'} focusable facing={'back'} mute={false} responsiveOrientationWhenOrientationLocked>
        <View style={styles.shutterContainer}>
          <Pressable onPress={takePicture}>
            {({ pressed }) => (
              <View
                style={[
                  styles.shutterBtn,
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}>
                <View
                  style={[
                    styles.shutterBtnInner,
                    {
                      backgroundColor: 'white',
                    },
                  ]}
                />
              </View>
            )}
          </Pressable>
        </View>
      </CameraView>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Text className="text-blue-400 text-xl" onPress={() => router.back()}>
              Cancel
            </Text>
          ),
          headerTitle: 'Scan Business Card',
        }}
      />
      {uri ? renderPicture() : renderCamera()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  camera: {
    // flex: 1,
    // marginTop: 20,
    width: '100%',
    height: '80%',
  },
  shutterContainer: {
    position: 'absolute',
    bottom: -100,
    left: 0,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  shutterBtn: {
    backgroundColor: 'transparent',
    borderWidth: 5,
    borderColor: 'white',
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
