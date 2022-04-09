module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true,
    },
    'extends': ['prettier', 'eslint:recommended'],
    'plugins': ['prettier'],
    'parserOptions': {
        'ecmaVersion': 'latest',
        "sourceType": "module",
        "allowImportExportEverywhere": true
    },
    'rules': {
        'prettier/prettier': ['error'],
    },
};
