const express = require('express')
const router = express.Router();

//Validators
const { check, validationResult } = require('express-validator');


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


router.get('/list', (req, res) => {
    res.send(
        [
            'BMW',
            'AUDI',
            'LAMBO',
            'MERCEDES',
        ]
    )
})

router.get('/id/:id', (req, res) => {
    res.send(req.params.id)
})

router.get('/:company/:model', (req, res) => {
    res.send(req.params)
})

router.get('/', (req, res) => {
    res.send(coches)
})


router.get('/:company', (req, res) => {

    const coche = coches.find(coche => coche.company === req.params.company)

    if(!coche)
    {
        res.send(404, 'No existe un coche de esta compañía');
    }else{
        res.send(coche)
    }    
})


router.post(
    '/', 
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


router.put(
    '/:id', 
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



router.delete(
    '/:id', 
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


module.exports = router