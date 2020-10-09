const fetch = require('node-fetch');

// GET - /api/news/global
const globalNews = async (req, res, next) => {
    try {

        // url building, just to make it clean
        const url1 = 'https://newsapi.org/v2/top-headlines';
        const url2 = `${url1}?sources=bbc-news&apiKey=${process.env.NEWSAPI_APIKEY}`;

        const raw = await fetch(url2);
        const { articles } = await raw.json();

        // returns the first 3 of the results
        res.json({ global_articles: articles.slice(0, 3) })

    }
    catch (err) {

        return next(err)

    }
}

module.exports = globalNews;