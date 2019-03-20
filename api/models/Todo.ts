import { sequelizeModel } from 'ts-sequelize-models';
import { DefineAttributes, DataTypes, Model, DefineOptions } from 'sequelize';
export class Todo extends sequelizeModel{
    getAttributes(DataTypes: DataTypes): DefineAttributes {
        return{
            title:DataTypes.STRING,
            createdAt:{type:DataTypes.DATE},
            done:{type:DataTypes.BOOLEAN, defaultValue:false, allowNull:true},
            doneAt:{type:DataTypes.DATE, allowNull:true,defaultValue:false},
        }
    }
}
