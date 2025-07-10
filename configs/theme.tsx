import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const myDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    // background: '#222b45',
    background: '#030e1f',
    //card: '#1a2138', // tab && top bar background
    card: '#020b1b', // tab && top bar background
    text: '#ffffff',
    border: '#303030',
    //btnPrimary: '#193cb8', // Tailwind : bg-blue-800
    //btnPrimaryPress: '#1447e6', // Tailwind : bg-blue-700
    // btnSecondary: '#8ec5ff', // Tailwind : bg-blue-300
    // btnSecondaryPress: '#bedbff', // Tailwind : bg-blue-200
  },
};
export const myLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // background: '#f5f8fa',
    // background: '#f8f8f8',
    background: '#fafafa',
    card: '#f7fafd',
    // primary: '#193cb8',
    primary: '#1E3A8A',
    // primary: '#3079dc',
    // primary: '#013399',
  },
};
