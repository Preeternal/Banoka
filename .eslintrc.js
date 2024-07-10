module.exports = {
    root: true,
    extends: '@react-native',
    plugins: ['import', 'module-resolver'],
    settings: {
        'import/resolver': {
            'babel-module': {},
            typescript: {
                alwaysTryTypes: true,
            },
        },
    },
    rules: {
        'import/order': [
            'error',
            {
                groups: [
                    'external',
                    'internal',
                    'index',
                    'sibling',
                    'parent',
                    'builtin',
                    'type',
                ],
            },
        ],
        'react/no-unstable-nested-components': [
            'warn',
            {
                allowAsProps: true,
                // customValidators:
                //     [] /* optional array of validators used for propTypes validation */,
            },
        ],
    },
};
