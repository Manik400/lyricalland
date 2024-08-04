const https = require('https');

exports.handler = async function(event, context) {
    const musixmatchApiKey = process.env.MUSIXMATCH_API_KEY;
    const trackTitle = event.queryStringParameters.trackTitle;
    const apiUrl = `https://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${musixmatchApiKey}`;

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
