module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      [
        'react-native-reanimated/plugin',
        {
          version: '3.17.5', // Explicitly set to match your installed version
        },
      ],
    ],
  };
};
