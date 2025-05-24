import React from 'react'
import { Drawer } from 'expo-router/drawer';

export default function _layout() {
    return <Drawer screenOptions={{ headerShown: false }} />
}