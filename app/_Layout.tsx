import {  Slot } from 'expo-router';
import {ThemeProvider , DarkTheme  } from '@react-navigation/native';

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
    <ThemeProvider value={myThmeme}>
      <Slot/>
    </ThemeProvider>
  )
}
