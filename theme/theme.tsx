import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const myDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#222b45',
    primary: 'blue', 
    card: '#1a2138', 
    text: '#ffffff',
    border: '#303030',
  },
};
export const myLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
  },
};