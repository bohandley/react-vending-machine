module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
        "jasmine": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": true,
        "jsx": true,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "warn",
            4
        ],
        "linebreak-style": [
            "warn",
            "unix"
        ],
        "quotes": [
            "warn",
            "double"
        ],
        "no-console": [
            "warn"
        ],
        "semi": [
            "warn",
            "always"
        ]
    }
};