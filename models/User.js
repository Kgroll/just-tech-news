

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
//create our User Model
class User extends Model {}

//define table columns and configuration
User.init(
    {
        //TABLE COLUMN DEFINITIONS GO HERE
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //define an email column
        email: {
            type:DataTypes.STRING,
            allowNull: false,
            //duplicate emails not allowed
            unique: true,
            //if allowNull is false we can run email through validator
            validate: {
                isEmail: true
            }
        },
        // define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //pswd must be 4 characters long
                len: [4]
            }
        }
    },
    {
        hooks: {
            //set up beforeCreate lifecycle "hook" Functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                    return newUserData;
                },
                //set up beforeUpdate "hook"
                async beforeUpdate(updatedUserData) {
                    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                    return updatedUserData;
                }
            },
    
    //TABLE CONFIGURATION OPTIONS GO HERE
    
    //sequelize connection
    sequelize,
    //don't automatically create timsestamp field
    timestamps: false,
    //don't pluralize name of database tabel
    freezeTableName: true,
    //use underscores instead of camel-casign
    underscored: true,
    //make model name stay lowercase
    modelName: 'user'
}
);

module.exports = User;