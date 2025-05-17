import {  Slot } from 'expo-router';
import {ThemeProvider , DarkTheme  } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const myThmeme = {
...DarkTheme,
color:{
  ...DarkTheme.colors,
  primary: 'blue',
},
}

export default function RootLayout() {
  // all providers go here
  return (
  <GestureHandlerRootView>
    <ThemeProvider value={myThmeme}>
      <Slot/>
    </ThemeProvider>
  </GestureHandlerRootView>
  )
}
