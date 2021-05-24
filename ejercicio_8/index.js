const promise = new Promise((resolve, reject) => {

    setTimeout(() => {
       // resolve({id:1, model:"model", company: 'seat'})
        reject(new Error('Se ha producido un error al leer la bd'))
    }, 5000)

})



promise.then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err.message);
})