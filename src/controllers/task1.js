const axios = require("axios")

// Create a function that takes in an array of URLs and downloads the contents from each URL using asynchronous methods. 
// Once all downloads are complete, return an array with the downloaded contents in the same order as the URLs.


const downloadContents = async (urls) => {
    try {
        let arrayToReturn = [];
        for (let i = 0; i < urls.length; i++) {
            const response = await axios.get(urls[i]);
            if (response.status == 200) {
                if (typeof response.data == "string") {
                    arrayToReturn.push({ data: response.data })
                }
                else {
                    arrayToReturn.push(response.data)
                }
            };
        }
        return arrayToReturn;
    } catch (error) {
        throw new Error(`Error downloading contents: ${error.message}`);
    }
}


const downlaod_content = async (req, res) => {
    try {
        const urlsToDownloadContent = req.body.urls
        const downloaded_content = await downloadContents(urlsToDownloadContent)
        return res.status(200).send({ downloaded_content })
    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
}



module.exports = downlaod_content