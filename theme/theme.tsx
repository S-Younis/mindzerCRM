import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const myDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#222b45',
    card: '#1a2138', // tab && top bar background
    text: '#ffffff',
    border: '#303030',
  },
};
export const myLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f5f8fa',
    card: '#f7fafd',
    primary: '#013399',
    // primary: '#0136a3',
  },
};
