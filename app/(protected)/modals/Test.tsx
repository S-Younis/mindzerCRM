import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Test = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Login Modal</Text>
            <Link className='bg-red-200' href="../" style={{ marginTop: 20 }}>
                <Text>Go Back</Text>
            </Link>
            <Link className='bg-red-200' href="./Test2" style={{ marginTop: 20 }}>
                <Text>Go Deep</Text>
            </Link>


        </View>
    )
}

export default Test