module.exports = {
    extends: ['plugin:vue/vue3-essential', 'airbnb-base'],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['vue'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'comma-dangle': ['error', 'always-multiline'],
        'arrow-parens': ['error', 'always'],
        'linebreak-style': 0,
        indent: ['error', 4],
        semi: ['error', 'always'],
        'vue/require-default-prop': 'off',
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                // 这里写覆盖vue文件的规则
            },
        },
    ],
};
