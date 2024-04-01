const express = require('express');
const router = express.Router();
const RSS = require('rss');
const Blog = require('../model/blog'); 
const marked = require('marked');

router.get('/rss', async (req, res) => {
    const feed = new RSS({
        title: 'Iluvnet RSS Feed',
        description: 'Latest articles from ILuvnet',
        feed_url: 'http://iluvnet.com/rss',
        site_url: 'http://iluvnet.com',
        pubDate: new Date()
    });

    try {
        const articles = await Blog.find().sort({ date: -1 }).limit(20); 
        articles.forEach(article => {
            let query = article.title.replace(/-/g, '@').replace(/\?/g, 'qmark').replace(/ /g, '-')
            let plainTextContent = marked.parse(article.description).replace(/<[^>]*>?/g, '').replace(/#39;/g, "'");
            feed.item({
                title: article.title,
                description: `${article.shortDescription} ${plainTextContent}`,
                url: `http://iluvnet.com/blogview/${query}`,
                date: article.date
            });
        });

        res.set('Content-Type', 'text/xml');
        res.send(feed.xml());
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
