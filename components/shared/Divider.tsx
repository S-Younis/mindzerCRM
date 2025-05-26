import { View, Text } from 'react-native'

type DividerProps = {
    title?: string;
    className?: string;
}
export const Divider = ({ title, className }: DividerProps) => {
    return (
        <View className={`flex-row items-center justify-center gap-4 ${className}`}>
            {title ? <>
                <View className="flex-1 h-[0.5px] bg-gray-200 dark:bg-[#444442]"></View>
                <Text className="text-gray-400 dark:text-gray-500 " > {title} </Text>
                <View className="flex-1  h-[0.5px] bg-gray-200 dark:bg-[#444442]"></View>
            </> :
                <View className="flex-1 h-[0.5px] bg-gray-200 dark:bg-[#444442]"></View>
            }
        </View>
    )
}

