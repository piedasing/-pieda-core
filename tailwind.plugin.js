const plugin = require('tailwindcss/plugin');

const rules = {
    row({ addComponents, theme }) {
        addComponents({
            '.row': {
                display: 'flex',
                flexWrap: 'wrap',
                marginLeft: '-' + theme('spacing.3'),
                marginRight: '-' + theme('spacing.3'),
            },
            '.row > *': {
                paddingLeft: theme('spacing.3'),
                paddingRight: theme('spacing.3'),
            },
        });
    },
    extra({ addComponents, theme }) {
        addComponents({
            '.flex-center': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            },
            '.absolute-center': {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            },
            '.x-middle': {
                left: '50%',
                transform: 'translateX(-50%)',
            },
            '.y-middle': {
                top: '50%',
                transform: 'translateY(-50%)',
            },
        });
    },
};

module.exports = {
    use: () => {
        let plugins = [];

        Object.keys(rules).forEach((rulekey) => {
            plugins.push(plugin(rules[rulekey]));
        });

        return plugins;
    },
};
