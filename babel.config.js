module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./src'],
                extensions: [
                    '.ios.ts',
                    '.android.ts',
                    '.ts',
                    '.ios.tsx',
                    '.android.tsx',
                    '.tsx',
                    '.jsx',
                    '.js',
                    '.json',
                ],
                alias: {
                    '@screens': './src/screens',
                    '@components': './src/components',
                    '@theme': './src/theme',
                    '@images': './src/assets/images',
                    '@services': './src/services',
                    '@navigation': './src/navigation',
                    '@config': './src/config',
                    '@state': './src/state',
                    '@locales': './src/locales',
                    '@context': './src/context',
                    '@hooks': './src/hooks',
                },
            },
        ],
        ['react-native-reanimated/plugin'],
    ],
};
