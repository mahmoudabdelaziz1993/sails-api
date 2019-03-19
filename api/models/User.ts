import { sequelizeModel } from 'ts-sequelize-models';
import { DefineAttributes, DataTypes, Model, DefineOptions } from 'sequelize';

export class User extends sequelizeModel {

    getAttributes(DataTypes: DataTypes): DefineAttributes {
        return {
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: { type: DataTypes.STRING, unique: true },
            password: DataTypes.STRING,
        };
    }
}


