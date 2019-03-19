let modelsBootstrapper = require('./../utilities/bootstrap/modelsBootstrapper').modelsBootstrapper;

let exportable = modelsBootstrapper.loadBootsrappers()
    .then(() => {

        console.log('Sequelize models loaded...');
    })
    .then(() => {
        global.req = { discardLog: true };
        return Sails(Object.assign({}, { port: 1338 }, rc('sails')));

    })
    .then(() => {

        let defaultConnection = require('../config/connections.json');

        if (defaultConnection && localConnection && defaultConnection.development) {
            defaultConnection.development = localConnection;
            defaultConnection.production = localConnection;
        }

        return defaultConnection;

    })
    .catch(err => console.log(err));


module.exports = exportable;