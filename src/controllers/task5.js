const { Users } = require("../models/Users");
const hash = require("hash-it");
const jwt = require("jsonwebtoken");
const config = require("../../config.json");

// Implement an authentication middleware using JWT (JSON Web Tokens) in a Node.js application. 
// Create endpoints that require authentication to access specific resources. Ensure proper token validation and handling of expired or invalid tokens.
// First we register a user and after registartion  we generate a token once he login and send him a token and then we make a middleware in my task 4 where 
// crud opperation performs and we check and verify the token and then allow user to only read their own notes only.


const register_user = async (req, res) => {
    try {
        let user_to_create = req.body;
        let filter = { email: user_to_create.email, archive: false }
        let find_user_in_db = await Users.findAll({ where: filter })
        if (find_user_in_db.length > 0) {
            return res.status(400).json({ error: 'An account is already associated with this email' })
        }
        else {
            user_to_create["password"] = hash(user_to_create.password)
            let create_user = await Users.create(user_to_create);
            console.log(create_user)
            return res.status(200).send({ msg: "Registered Successfully." })
        }
    } catch (err) {
        console.log("err", err)
        return res.status(400).send({ error: "error occured while registring user" })
    }
}

const login_user = async (req, res) => {
    try {
        let payload = req.body;
        let filter = { email: payload.email, archive: false }
        let find_user_in_db = await Users.findAll({ where: filter })
        if (find_user_in_db.length > 0) {
            let user = find_user_in_db[0].dataValues;
            if (user.password == hash(payload.password)) {
                let token = jwt.sign({           // Generate Token
                    user
                }, config.jwt.secret, { expiresIn: 60 * 5 })  // Expires in 5 min
                delete user["password"];
                delete user["archive"];
                res.status(200).send({ msg: "Loign Successfully.", token, user })
            }
            else {
                return res.status(400).json({ error: 'Incorrect password.' })
            }
        }
        else {
            return res.status(400).json({ error: 'No account exists with this email' })
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: "error occured while login user" })
    }
}

module.exports = { register_user, login_user }