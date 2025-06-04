import { myDarkTheme, myLightTheme } from '@/configs/theme';
import { usePrefStore } from '@/stores/pref.store';
import { useColorScheme } from 'nativewind'

/***
 This hook is used to manage the configuration of the app's Theme , it reads the local storage for the user's theme
 preference and sets the color scheme accordingly.
 It also provides the theme properties for React Navigation based on the current theme. 
 ***/

const useConfig = () => {

    // NativeWind Theme
    const { colorScheme, setColorScheme } = useColorScheme(); // Auto-detect system color scheme
    const theme = usePrefStore((state) => state.theme);
    const setTheme = usePrefStore((state) => state.setTheme)

    if (theme) {
        setColorScheme(theme);
    } else {
        const themeValue = colorScheme == 'dark' ? 'dark' : 'light';
        setColorScheme(themeValue);
        setTheme(themeValue);
    }

    // React Navigation Theme
    let themeProperties;
    switch (theme) {
        case 'dark':
            themeProperties = myDarkTheme;
            break;
        case 'light':
            themeProperties = myLightTheme;
            break;
        case 'system':
            themeProperties = colorScheme == 'dark' ? myDarkTheme : myLightTheme;
            break;
    }


    return { themeProperties }
}

export default useConfig