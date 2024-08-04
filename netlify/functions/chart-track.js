const https = require('https');

exports.handler = async function(event, context) {
    const musixmatchApiKey = process.env.MUSIXMATCH_API_KEY;
    const apiUrl = `https://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=in&f_has_lyrics=1&apikey=${musixmatchApiKey}`;

    return new Promise((resolve, reject) => {
        https.get(apiUrl, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                resolve({
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json"
                    },
                    body: data
                });
            });
        }).on("error", (err) => {
            reject({
                statusCode: 500,
                body: JSON.stringify({ message: err.message })
            });
        });
    });
};
