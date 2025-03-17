//Handle all environment related things

//module scaffolding

const environment = {};

environment.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'kabirulkabirul',
};
environment.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'kabirulkabirul',
};

//determine which environment was passed
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging';

//export correspending environment object
const environmentExport = typeof(environment[currentEnvironment]) === 'object' ? environment[currentEnvironment] : environment.staging;

module.exports = environmentExport;