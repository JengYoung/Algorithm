module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': ['prettier', 'eslint:recommended'],
    'plugins': ['prettier'],
    'parserOptions': {
        'ecmaVersion': 'latest'
    },
    'rules': {
        'prettier/prettier': ['error'],
    },
};
