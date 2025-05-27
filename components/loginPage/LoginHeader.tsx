import { View, Text } from 'react-native'
import { Image } from 'expo-image';


export const LoginHeader = ({ ...props }: React.ComponentProps<typeof View>) => {

    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    return (
        <View {...props}>
            <Image
                style={{ width: 200, height: 60, marginLeft: 'auto', marginRight: 'auto', }}
                source={require('@/assets/MINDZER.png')}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={250}
            />
            <Text className="text-sm font-medium text-center  text-gray-400 dark:text-[#DBDBDB]"> Enter your credentials to access your account </Text>
        </View>
    )
}
