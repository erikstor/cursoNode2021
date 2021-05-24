const { json } = require('express');
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

//Validators
const { check, validationResult } = require('express-validator');

//Middlewares
const date = require('./date')
const morgan = require('morgan')

app.use(express.json())

app.use(morgan('tiny'))

app.use(date)

app.use('/api/cars/list', function (req, res, next) {
    console.log('Request Type ',req.method)
    next()
})


var coches = [
    {
        id:1,
        company:'BMW',
        model:'S3',
        year:'2010'
    },
    {
        id:2,
        company:'AUDI',
        model:'AAA',
        year:'2010'
    },
    {
        id:3,
        company:'LAMBO',
        model:'LLL',
        year:'2010'
    },
]


app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/cars/list', (req, res) => {
    res.send(
        [
            'BMW',
            'AUDI',
            'LAMBO',
            'MERCEDES',
        ]
    )
})

app.get('/api/cars/id/:id', (req, res) => {
    res.send(req.params.id)
})

app.get('/api/cars/:company/:model', (req, res) => {
    res.send(req.params)
})

app.get('/api/cars/', (req, res) => {
    res.send(coches)
})


app.get('/api/cars/:company', (req, res) => {

    const coche = coches.find(coche => coche.company === req.params.company)

    if(!coche)
    {
        res.send(404, 'No existe un coche de esta compañía');
    }else{
        res.send(coche)
    }    
})


app.post(
    '/api/cars', 
    [
        check('company').isLength({min: 3}),
        check('model').isLength({min: 3}),
        check('year').isNumeric()
    ],
    (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.send(422, {errors: errors.array()})
        }

        let carId = coches.length + 1
        let coche = {
            id: carId,
            company: req.body.company, 
            model: req.body.model,
            year: req.body.year
        }

        coches.push(coche)
        res.send(201, coches)
    }
)


app.put(
    '/api/cars/:id', 
    [
        check('company').isLength({min: 3}),
        check('model').isLength({min: 3}),
        check('year').isNumeric()
    ],
    (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.send(422, {errors: errors.array()})
        }

        let coche = coches.find( coche => coche.id === parseInt(req.params.id))

        if(!coche) {
            return res.send(204, 'El coche no existe')
        }
        
        coche.company = req.body.company
        coche.model = req.body.model
        coche.year = req.body.year
        
        res.send(200, 'El coche actualizado')
    }
)



app.delete(
    '/api/cars/:id', 
    [
        check('company').isLength({min: 3}),
        check('model').isLength({min: 3}),
        check('year').isNumeric()
    ],
    (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.send(422, {errors: errors.array()})
        }

        let coche = coches.find( coche => coche.id === parseInt(req.params.id))

        if(!coche) {
            return res.send(204, 'El coche no existe')
        }
        
        const index = coches.indexOf(coche)

        coches.splice(index, 1)
        
        res.send(200, 'El coche borrado')
    }
)




app.listen(port, () => console.log(`Example app listening on port ${port}!`))