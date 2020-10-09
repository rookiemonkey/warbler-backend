const requestCountry = require('request-country');
const fetch = require('node-fetch');

// GET - /api/news/local
const localNews = async (req, res, next) => {
    try {

        // detemine country origin of request, false if cant
        const result = requestCountry(req);

        // sets PH as default country origin, incase false
        const countryCode = result ? result : 'ph';

        // url building, just to make it clean
        const url1 = 'https://newsapi.org/v2/top-headlines?country=';
        const url2 = `${url1}${countryCode}&apiKey=`;
        const url3 = `${url2}${process.env.NEWSAPI_APIKEY}`;

        const raw = await fetch(url3);
        const { articles } = await raw.json();

        // returns the first 3 of the results
        res.json({ local_articles: articles.slice(0, 3) })

    }
    catch (err) {

        return next(err)

    }
}

module.exports = localNews;