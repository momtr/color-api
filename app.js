const express = require('express');
const app = express();

app.use(express.json());

app.use(express.static('client/static'));

const api = require('./api');
app.use('/api/v1', api);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/client/views/index.html`);
});

app.get('/colors/:id', (req, res) => {
    res.sendFile(`${__dirname}/client/views/color.html`);
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`🚀 app is listening on port ${port}`);
});