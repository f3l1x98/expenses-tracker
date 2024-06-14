const nxPreset = require('@nx/jest/preset').default;

module.exports = {
    ...nxPreset,
    testMatch: ['**/?(*.)+(spec|test|e2e-spec).[jt]s?(x)'],
};
