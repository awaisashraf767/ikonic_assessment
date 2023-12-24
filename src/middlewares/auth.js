const jwt = require('jsonwebtoken');
const config=require("../../config.json");

let authenticate_token = (req, res, next) => {
	try {
        console.log("called");
		const authHeader = req.headers['authorization']
		const token = authHeader && authHeader.split(' ')[1]
		if (token == null) return res.sendStatus(401)
		jwt.verify(token, config.jwt.secret, (err, user) => {
			if (err) {
				console.log('err3: ', err)
				return res.status(401).send({error: 'unauthorized',msg:err.message})
			}
			req.user = user.user
			next()
		})
	} catch (error) {
		console.log("error in verify_token", error)
		return res.status(400).json({success: false, error: "Erorr in verify token"})
	}
}

module.exports = { authenticate_token }
