const express = require('express');
const router = express.Router();

const schema = require('../schema');
const errorHandeler = require('../handelers/errorHandeler');

const FirebaseRealTime = require('../database/database');
const db = new FirebaseRealTime();

router.get('/', (req, res, next) => {
    res.status(200);
    res.json({
        status: 'success',
        message: '🚀 Welcome to the color API'
    })
});

/** add a new color */
router.post('/colors', (req, res, next) => {
    let data = req.query;
    /** validate data */
    let validate = schema.color.validate(data);
    if(validate.error) {
        errorHandeler(res, 'Parameters not valid', 400);
        return;
    }
    /** post to API */
    data.id = Date.now();
    db.insertData('colors', data.id, data);
    /** send response message */
    res.send({
        status: 'success',
        message: '🚀 Color successfully uploaded!'
    });
});

/** get last colors (feed) */
router.get('/colors', async (req, res, next) => {
    /** get colors */
    let colors = await db.getData('colors');
    let keys = Object.keys(colors);
    const limit = ((req.query.num < 100) ? req.query.num : 100);
    let num = ((keys.length < limit) ? keys.length : limit);
    /** send them to the client */
    res.send({
        status: 'success',
        message: `🚀 ${num} colors given in response.data!`,
        data: {
            colors: keys.map(i => colors[i]).slice(0, num)
        }
    });
});

/** get colors of a certain category */
router.get('/colors/categories/:category', (req, res, next) => {

});

/** get a color by its id */
router.get('/colors/:id', (req, res, next) => {

});

module.exports = router;