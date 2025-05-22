import { View, Text } from 'react-native';
import { BaseToast, ErrorToast, ToastConfigParams, InfoToast } from 'react-native-toast-message';
// import Ionicons from '@expo/vector-icons/Ionicons';

declare type ToastConfig = {
    [key: string]: (params: ToastConfigParams<any>) => React.ReactNode;
};

export const toastConfig: ToastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
        <BaseToast
            {...props}
            style={{
                borderLeftColor: '#166534', // Tailwind : border-green-800
                backgroundColor: '#f0fdf4', // Tailwind : bg-green-50
                borderRadius: 10,
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            }}
            contentContainerStyle={{ paddingHorizontal: 14 }}
            text1Style={{
                fontSize: 15,
                fontWeight: '400',
                color: '#166534', // Tailwind : text-green-800
            }}
            text2Style={{
                fontSize: 13,
                fontWeight: '400',
                color: '#737373', // Tailwind : text-nuetral-600
            }}
        />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
        <ErrorToast
            {...props}
            style={{
                borderLeftColor: '#e7000b', // Tailwind : border-red-600
                backgroundColor: '#fef2f2', // Tailwind : bg-red-50
                borderRadius: 10,
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            }}
            contentContainerStyle={{ paddingHorizontal: 14 }}
            text1Style={{
                fontSize: 15,
                fontWeight: '400',
                color: '#e7000b', // Tailwind : text-red-600
            }}
            text2Style={{
                fontSize: 13,
                fontWeight: '400',
                color: '#737373', // Tailwind : text-nuetral-600
            }}
        />
    ),

    info: (props) => (
        <InfoToast
            // renderLeadingIcon={() => <View className=' flex-row items-center justify-center  bg-red-200'>
            //     <Ionicons name="information-circle-outline" size={32} color="#00bcff" />
            // </View>
            // }
            {...props}
            style={{
                borderLeftColor: '#00bcff', // Tailwind : bg-sky-400
                backgroundColor: '#f0f9ff', // Tailwind : bg-sky-50
                borderRadius: 10,
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            }}
            contentContainerStyle={{ paddingHorizontal: 14 }}
            text1Style={{
                fontSize: 15,
                fontWeight: '400',
                color: '#00a6f4', // Tailwind : text-red-500
            }}
            text2Style={{
                fontSize: 13,
                fontWeight: '400',
                color: '#737373', // Tailwind : text-nuetral-600
            }}
        />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    tomatoToast: ({ text1, props }) => (
        <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
            <Text>{text1}</Text>
            <Text>{props.uuid}</Text>
        </View>
    )
};

