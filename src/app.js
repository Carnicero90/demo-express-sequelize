'use strict';

const express = require('express');
// importaz file .env come variabili ambientali
const dotenv = require('dotenv');
dotenv.config();

const { sequelize, Article, Author } = require('./models');

const app = express();
// parsing json
app.use(express.json());
app.set('view engine', 'pug');

const PORT = process.env.PORT || '8080';
const HOST = process.env.HOST || '0.0.0.0';

// routes
app.get('/', async (_, res) => {
    const articles = await Article.findAll({ include: [Author] });
    console.log(articles)
    res.render('index', { articles: articles });
});
app.get('/articles/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const article = await Article.findOne({ uuid });
        res.render('post', {article: article});
    } catch (err) {
        console.error(err);
    }
})
app.put('/articles/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    const { title, body } = req.body;
    try {
        const article = await Article.findOne({ uuid: uuid });
        article.update({ title: title, body: body});
        return res.json(article)

    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
})
app.post('/articles', async (req, res) => {
    const { title, body, author } = req.body;
    try {
        const article = await Article.create({ title, body, author });
        return res.json(article);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});

app.post('/authors', async (req, res) => {
    const { name } = req.body;
    try {
        const author = await Author.create({ name });
        return res.json(author);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});

app.get('/authors/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const author = await Author.findOne({
            where: { id }
        });
        res.send(author);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});

app.get('/articles', async (_, res) => {
    try {
        const articles = await Article.findAll();
        res.send(articles);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});


app.get('api/articles/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const article = await Article.findOne({
            where: { uuid },
            include: [Author],
        });
        // altro modo di accedere a modello associato:
        article.getAuthor().then(a => console.log(a));
        res.send(article);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});
// main
app.listen({ port: PORT, host: HOST }, async () => {
    // sostanzialmente sovrascriviamo table ogni volta che cambiamo robe: 
    // ok per prima fase sviluppo (o se si hanno seeder decenti, quindi non ora che e' crepato faker.js)
    // await sequelize.sync({ force: true });

    // in prod, invece:
    await sequelize.authenticate();
    console.log(`Running on http://${HOST}:${PORT}`);

});