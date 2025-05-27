import { View, Text } from 'react-native'

type FooterProps = {
    className?: string;
}

export const LoginFooter = ({ className }: FooterProps) => {
    return (
        <View className={`justify-center items-center gap-2 ${className} `}>
            <Text className="text-gray-400 text-xs">@{new Date().getFullYear()}  mindzer.com</Text>
            <View className="flex-row items-center gap-4">
                <Text className="text-blue-600 dark:text-blue-500 text-xs underline">Terms of Service</Text>
                <Text className="text-gray-200 dark:text-gray-600">|</Text>
                <Text className="text-blue-600 dark:text-blue-500 text-xs underline">Privacy Policy</Text>
                <Text className="text-gray-200 dark:text-gray-600">|</Text>
                <Text className="text-blue-600 dark:text-blue-500 text-xs underline">Contact us</Text>
            </View>
        </View>
    )
}

