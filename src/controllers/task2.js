const axios = require('axios');

// Design a function that fetches data from an API endpoint.Implement proper error handling to handle various HTTP status codes and network failures.
//  Log appropriate messages for each type of error encountered.



const error_handling = async (req, res) => {
    try {
        const url="https://api.publicapis.org/entries";
        const response = await axios.get(url);
        if (response.status === 200) {
            res.status(200).send({ data: response.data })
        }
    } catch (error) {
        if (error.response) {
            return res.status(400).send({
                error: `HTTP error occurred: ${error.response.status} && Error response data: ${error.response.data} && 
            Error response headers: ${error.response.headers}`
            })
        } else if (error.request) {
            return res.status(400).send({
                error: `Request made but no response received: ${error.request}`
            })
        }
        else if (error.message.startsWith('Network')) {
            return res.status(400).send({
                error: `Network error: ${error.message}`
            })
        }
        else {
            return res.status(400).send({
                error: `Error during request setup: ${error.message}`
            })
        }
    }
}

module.exports = error_handling