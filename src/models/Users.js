const { DataTypes } = require("sequelize");
const { getDb } = require("../scripts/db_connection")

const db = getDb();

const definition = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'column',
        validate: {
            isEmail: {
                args: true,
                msg: "Email is not Valid"
            },
        },
    },
    password: {
        type: DataTypes.STRING,
    },
    phone_no: {
        type: DataTypes.STRING,
    },
    gender: {
        type: DataTypes.STRING,
    },
    date_of_birth: {
        type: DataTypes.DATEONLY,
    },
    city: {
        type: DataTypes.STRING,
    },
    country: {
        type: DataTypes.STRING,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    archive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
};


const Users = db.define("Users", definition, { timestamps: false })


module.exports = {Users,definition}
