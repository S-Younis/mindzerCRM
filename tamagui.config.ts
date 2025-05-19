import { createTamagui, createTokens } from 'tamagui';
// import { defaultConfig } from '@tamagui/config/v4'; // for quick config 
import { color, radius, size, space, themes, zIndex } from '@tamagui/themes'

const tokens = createTokens({
  size,
  space,
  zIndex,
  color,
  radius,
})

export const config = createTamagui({
  themes,
  tokens,
  // ... see Configuration
})

// export const config = createTamagui(defaultConfig);

type Conf = typeof config;

// make imports typed
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}
