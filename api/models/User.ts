import { sequelizeModel } from 'ts-sequelize-models';
import { DefineAttributes, DataTypes, Model, DefineOptions } from 'sequelize';
import { access } from 'fs';
import { any } from 'bluebird';
const jwt = require('jsonwebtoken');

export class User extends sequelizeModel {
    [x: string]: any;
    email: any;

    getAttributes(DataTypes: DataTypes): DefineAttributes {
        return {
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: { type: DataTypes.STRING, unique: true },
            password: DataTypes.STRING,
            apItoken: DataTypes.STRING,
        };

    }
    beforeCreate() {
         return async (user: any, options: any) => {
            var token = jwt.sign({ id: user.email }, 'secretxxx').toString();
            user.apItoken=token;
        }
        // var token = jwt.sign({ email:this.email.toHexString() }, 'secretxxx').toString();
        // this.apItoken=token;
    }
    //---------------------------------- genrate the token  ---------------------------
    // genrateToken=async()=>{
    // var token = jwt.sign({ id:this.email.toHexString() }, 'secretxxx').toString();
    // return token ;
    // }
}


