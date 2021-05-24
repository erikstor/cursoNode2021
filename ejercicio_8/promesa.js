function getCar(id) {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            console.log('BD conection');
            resolve({id:24,model:'kk', company:'x'})
        }, 3000)
    })
}

function getModel(model) {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            console.log('Objecto modelo');
            resolve({speed:200,seat:'5', size:'4x5'})
        }, 3000)
    })
}


// const promesa = getCar(23)

// promesa.then(car => {
//     console.log(car);
// })

// promesa.then(car => getModel(car.model))
//         .then(model => console.log(model))
//         .catch(err => console.log(err))

async function showModel() {
    try{
        const car = await getCar(23)
        const model = await getModel(car.model)
        console.log(model)
    }catch (err) {
        console.log(err.message)
    }
}

showModel()