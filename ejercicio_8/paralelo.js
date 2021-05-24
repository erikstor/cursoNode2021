const promesa1 = new Promise(((resolve, reject) => {
    setTimeout(() => {
        console.log('Api 1')
        resolve({amigos:100, likes:'ya quisieras'})
    }, 1000)
}))


const promesa2 = new Promise(((resolve, reject) => {
    setTimeout(() => {
        console.log('Api 2')
        resolve({amigos:120, likes:'ya quisieras 2'})
    }, 1000)
}))

// Promise.all([promesa1, promesa2])
//         .then( result => console.log(result))
//         .catch(err => console.log(err.message))


Promise.race([promesa1, promesa2])
    .then( result => console.log(result))
    .catch(err => console.log(err.message))