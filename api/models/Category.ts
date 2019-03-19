import { sequelizeModel } from 'ts-sequelize-models';
import { DefineAttributes, DataTypes, Model, DefineOptions } from 'sequelize';

export class Category extends sequelizeModel {

    getAttributes(DataTypes: DataTypes): DefineAttributes {
        return {
            column1: DataTypes.STRING
        };
    }
}


