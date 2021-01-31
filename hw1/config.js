/*
    Setting Enviornment
*/

const enviornment = {};

// DEFAULT ENVIRONMENT
enviornment.staging = {
    'httpPort': 4000,
    'envName': 'staging',
    'httpsPort': 4001,
};

enviornment.production = {
    'httpPort': 6000,
    'httpsPort': 6001,
    'envName': 'production'
};

const activeEnvironmentType = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// verify environment is valid
let environmentType = typeof(enviornment[activeEnvironmentType]) == 'object' ? enviornment[activeEnvironmentType] : enviornment.staging;

module.exports = environmentType;

