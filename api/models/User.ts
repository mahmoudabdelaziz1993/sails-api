import { sequelizeModel } from 'ts-sequelize-models';
import { DefineAttributes, DataTypes, Model, DefineOptions } from 'sequelize';
import { access } from 'fs';
const jwt = require('jsonwebtoken');

export class User extends sequelizeModel {
    email: any;

    getAttributes(DataTypes: DataTypes): DefineAttributes {
        return {
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: { type: DataTypes.STRING, unique: true },
            password: DataTypes.STRING,
            apItoken :DataTypes.STRING,
        };
    }
    //---------------------------------- genrate the token  ---------------------------
    genrateToken=async()=>{
	var token = jwt.sign({ id:this.email.toHexString() }, 'secretxxx').toString();
	return token ;
    }
}


