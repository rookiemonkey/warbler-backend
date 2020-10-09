const requestCountry = require('request-country');
const fetch = require('node-fetch');

// GET - /api/news/categories
const categoricalNews = async (req, res, next) => {
    try {

        // detemine country origin of request, false if cant
        const countryOrigin = requestCountry(req);

        // sets PH as default country origin, incase false
        const countryCode = countryOrigin ? countryOrigin : 'ph';

        // initialize categories and perform fetch loop
        const categories = [
            'business', 'entertainment', 'general', 'health',
            'science', 'sports', 'technology',
        ];

        let result = {};

        for (let i = 0; i <= categories.length - 1; i++) {
            // url building, just to make it clean
            const url1 = `https://newsapi.org/v2/top-headlines?country=${countryCode}`;
            const url2 = `${url1}&category=${categories[i]}&apiKey=`;
            const url3 = `${url2}${process.env.NEWSAPI_APIKEY}`;

            const raw = await fetch(url3);
            const { articles } = await raw.json();

            result[categories[i]] = articles[0];
        }

        res.json(result)

    }
    catch (err) {

        return next(err)

    }
}

module.exports = categoricalNews;