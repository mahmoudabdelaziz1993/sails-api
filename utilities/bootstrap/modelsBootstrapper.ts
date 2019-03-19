
import { bootstrapsLoader } from "./bootstrapsLoader";
import { Sequelize, Model } from "sequelize";
const Sequelize = require('sequelize');
let env = process.env.NODE_ENV || 'development';
let config = require('../../config/connection.json')[env];
const Op = Sequelize.Op;
import { sequelizeInit } from 'ts-sequelize-models';
let modelConfig = require('../../config/models')['models'];

export class modelsBootstrapper extends bootstrapsLoader {

    sequelize: Sequelize;

    async runBootstrap() {
        // initializing sequelize object 
        this.initializeSequilize();

        // running this awesome package which initializes all the models
        let { sequelize, models } = await sequelizeInit(this.sequelize, './api/models/',
            {
                exposeGlobal: true,
                sync: {
                    alter: modelConfig.alter,
                    force: modelConfig.force
                }
            });

        return sequelize;
    }

    initializeSequilize(): Sequelize {
        let localConnection = null;
        let log = false;

        try {
            localConnection = require('../../config/local.js').connection;
            log = require('../../config/local.js').log;
        } catch (err) {

        }

        if (env === 'development' && localConnection)
            config = localConnection;

        let sequelize = null;

        if (config.use_env_variable) {
            config['logging'] = log;
            config['operatorsAliases'] = Op;
            this.sequelize = new Sequelize(process.env[config.use_env_variable], config);
        } else {

            config['logging'] = log;
            config['operatorsAliases'] = Op;
            this.sequelize = new Sequelize(config.database, config.username, config.password, config);
        }

        return sequelize;
    }
}