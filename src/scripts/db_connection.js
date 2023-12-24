const { Sequelize } = require('sequelize');
const fs=require("fs")
const config = require("../../config.json")

const initializeModels = (db, modelsPath) => {
    fs.readdir(modelsPath, async (err, files) => {
        if (!err) {
            files.forEach(file => {
                const modelJson = require(modelsPath + file)
                const modelName = file.split('.')[0]
                var model
                try {
                    model = db.model(modelName)
                } catch (e) {
                    model = db.define(modelName, modelJson.definition, {
                        tableName: modelName,
                        timestamps: false,
                        underscored: true
                    })
                    model.sync().then(res => console.log('created ', res)).catch(err => console.log({ err }))
                }
            })
        } else console.log(err.message)
    })
}

const connectDB = () => {
    try {
        const db = new Sequelize(config.db.database, config.db.username, config.db.password, {
            host: config.db.host,
            port: config.db.port,
            dialect: config.db.dialect,
            logging: false,
            benchmark: false,
        })
        db.authenticate().then(() => console.log('Connection has been established successfully.')).catch((err) => console.error("Error While Connecting database", err));
        let modelsPath = process.env.PWD + "/src/models/";
        initializeModels(db, modelsPath);
    } catch (error) {
        console.log("Error While Connecting database", error);
    }
}

const getDb = () => {
    try {
        const db = new Sequelize(config.db.database, config.db.username, config.db.password, {
            host: config.db.host,
            port: config.db.port,
            dialect: config.db.dialect
        })
        return db;
    } catch (error) {
        console.log("Error While Connecting database", error);
    }
}
module.exports = {getDb,connectDB};