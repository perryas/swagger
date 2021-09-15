const express = require('express');
const app     = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// data parser - used to parse post data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Library API',
            version: '1.0.0'
        }
    },
    apis: ['app.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
* @swagger
* /cats:
*   get:
*     description: Get all cats
*     responses:
*       200:
*         description: Success
*
*/
app.get('/cats', (req,res) => {
    res.send([
        {
            breed: 'British Short Hair',
            lifespan: '2-16 years',
            dailysleep: '12-16 hours'
        }
    ]);
});

/**
* @swagger
* /cat:
*   post:
*     description: Get one cat
*     parameters:
*     - name: breed
*       description: Cat breed
*       in: body
*       required: true
*       type: string
*     responses:
*       200:
*         description: Success
*
*/
app.post('/cat', (req,res) => {
    const breed = req.body.breed;
    res.send({ breed});
});

app.listen(5000, () => {
    console.log('Running on port 5000');
})