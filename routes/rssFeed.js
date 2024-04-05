const express = require('express');
const router = express.Router();
const RSS = require('rss');
const Blog = require('../model/blog'); 
const marked = require('marked');

router.get('/', async (req, res) => {
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
                date: article.date,
                enclosure: {url: `${article.image}`},
            });
        });

        res.set('Content-Type', 'text/xml');
        res.send(feed.xml());
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/tech', async (req, res) => {
const tagsToFind = ['tech']; // Array of tags to find
const regexTags = tagsToFind.map(tag => new RegExp(tag, 'i'));
    const feed = new RSS({
        title: 'Iluvnet RSS Feed',
        description: 'Latest articles from ILuvnet',
        feed_url: 'http://iluvnet.com/rss/tech',
        site_url: 'http://iluvnet.com',
        pubDate: new Date()
    });

    try {
        const articles = await Blog.find({ tags: { $in: regexTags } }).sort({ date: -1 }).limit(20); 
     
        articles.forEach(article => {
            let query = article.title.replace(/-/g, '@').replace(/\?/g, 'qmark').replace(/ /g, '-')
            let plainTextContent = marked.parse(article.description).replace(/<[^>]*>?/g, '').replace(/#39;/g, "'");
            feed.item({
                title: article.title,
                description: `${article.shortDescription} ${plainTextContent}`,
                url: `http://iluvnet.com/blogview/${query}`,
                date: article.date,
                enclosure: {url: `${article.image}`},
            });
        });

        res.set('Content-Type', 'text/xml');
        res.send(feed.xml());
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/life', async (req, res) => {

    const tagsToFind = ['life']; 
    const regexTags = tagsToFind.map(tag => new RegExp(tag, 'i'));
    const feed = new RSS({
        title: 'Iluvnet RSS Feed',
        description: 'Latest articles from ILuvnet',
        feed_url: 'http://iluvnet.com/rss/life',
        site_url: 'http://iluvnet.com',
        pubDate: new Date()
    });

    try {
        const articles = await Blog.find({ tags: { $in: regexTags} }).sort({ date: -1 }).limit(20); 
        
        articles.forEach(article => {
            let query = article.title.replace(/-/g, '@').replace(/\?/g, 'qmark').replace(/ /g, '-')
            let plainTextContent = marked.parse(article.description).replace(/<[^>]*>?/g, '').replace(/#39;/g, "'");
            feed.item({
                title: article.title,
                description: `${article.shortDescription} ${plainTextContent}`,
                url: `http://iluvnet.com/blogview/${query}`,
                date: article.date,
                enclosure: {url: `${article.image}`},
            });
        });

        res.set('Content-Type', 'text/xml');
        res.send(feed.xml());
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/finance', async (req, res) => {

    const tagsToFind = ['money', 'investing','crypto',"stocks","bitcoin"]; 
    const regexTags = tagsToFind.map(tag => new RegExp(tag, 'i'));
    const feed = new RSS({
        title: 'Iluvnet RSS Feed',
        description: 'Latest articles from ILuvnet',
        feed_url: 'http://iluvnet.com/rss/finance',
        site_url: 'http://iluvnet.com',
        pubDate: new Date()
    });

    try {
        const articles = await Blog.find({ tags: { $in: regexTags} }).sort({ date: -1 }).limit(20); 
        
        articles.forEach(article => {
            let query = article.title.replace(/-/g, '@').replace(/\?/g, 'qmark').replace(/ /g, '-')
            let plainTextContent = marked.parse(article.description).replace(/<[^>]*>?/g, '').replace(/#39;/g, "'");
            feed.item({
                title: article.title,
                description: `${article.shortDescription} ${plainTextContent}`,
                url: `http://iluvnet.com/blogview/${query}`,
                date: article.date,
                enclosure: {url: `${article.image}`},
            });
        });

        res.set('Content-Type', 'text/xml');
        res.send(feed.xml());
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/news', async (req, res) => {

    const tagsToFind = ['news']; 
    const regexTags = tagsToFind.map(tag => new RegExp(tag, 'i'));
    const feed = new RSS({
        title: 'Iluvnet RSS Feed',
        description: 'Latest articles from ILuvnet',
        feed_url: 'http://iluvnet.com/rss/news',
        site_url: 'http://iluvnet.com',
        pubDate: new Date()
    });

    try {
        const articles = await Blog.find({ tags: { $in: regexTags} }).sort({ date: -1 }).limit(20); 
        
        articles.forEach(article => {
            let query = article.title.replace(/-/g, '@').replace(/\?/g, 'qmark').replace(/ /g, '-')
            let plainTextContent = marked.parse(article.description).replace(/<[^>]*>?/g, '').replace(/#39;/g, "'");
            feed.item({
                title: article.title,
                description: `${article.shortDescription} ${plainTextContent}`,
                url: `http://iluvnet.com/blogview/${query}`,
                date: article.date,
                enclosure: {url: `${article.image}`},
            });
        });

        res.set('Content-Type', 'text/xml');
        res.send(feed.xml());
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/movies', async (req, res) => {

    const tagsToFind = ['movies','FILM','CINEMA','FILMS']; 
    const regexTags = tagsToFind.map(tag => new RegExp(tag, 'i'));
    const feed = new RSS({
        title: 'Iluvnet RSS Feed',
        description: 'Latest articles from ILuvnet',
        feed_url: 'http://iluvnet.com/rss/movies',
        site_url: 'http://iluvnet.com',
        pubDate: new Date()
    });

    try {
        const articles = await Blog.find({ tags: { $in: regexTags} }).sort({ date: -1 }).limit(20); 
       
        articles.forEach(article => {
            let query = article.title.replace(/-/g, '@').replace(/\?/g, 'qmark').replace(/ /g, '-')
            let plainTextContent = marked.parse(article.description).replace(/<[^>]*>?/g, '').replace(/#39;/g, "'");
            feed.item({
                title: article.title,
                description: `${article.shortDescription} ${plainTextContent}`,
                url: `http://iluvnet.com/blogview/${query}`,
                date: article.date,
                enclosure: {url: `${article.image}`},
            });
        });

        res.set('Content-Type', 'text/xml');
        res.send(feed.xml());
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/reviews', async (req, res) => {

    const tagsToFind = ['Review','Gadgets','Reviews']; 
    const regexTags = tagsToFind.map(tag => new RegExp(tag, 'i'));
    const feed = new RSS({
        title: 'Iluvnet RSS Feed',
        description: 'Latest articles from ILuvnet',
        feed_url: 'http://iluvnet.com/rss/reviews',
        site_url: 'http://iluvnet.com',
        pubDate: new Date()
    });

    try {
        const articles = await Blog.find({ tags: { $in: regexTags} }).sort({ date: -1 }).limit(20); 
       
        articles.forEach(article => {
            let query = article.title.replace(/-/g, '@').replace(/\?/g, 'qmark').replace(/ /g, '-')
            let plainTextContent = marked.parse(article.description).replace(/<[^>]*>?/g, '').replace(/#39;/g, "'");
            feed.item({
                title: article.title,
                description: `${article.shortDescription} ${plainTextContent}`,
                url: `http://iluvnet.com/blogview/${query}`,
                date: article.date,
                enclosure: {url: `${article.image}`},
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
