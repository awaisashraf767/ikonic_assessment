const { DataTypes } = require("sequelize");
const { getDb } = require("../scripts/db_connection")

const db = getDb();

const definition = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    message: {
        type: DataTypes.TEXT
    },
    archive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    created_by: {
        type: DataTypes.INTEGER,
    },
    updated_by: {
        type: DataTypes.INTEGER,
    }
};


const Notes = db.define("Notes", definition, { timestamps: false })


module.exports = { Notes, definition }
