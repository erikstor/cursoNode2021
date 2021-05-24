const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('event', function () {
    console.log('Me llamaste pri ?');
})

emitter.emit('event');

emitter.on('eventWithArgument', function(arg) {
    console.log(`Papi me llego un objeto con un id: ${arg.id} y un nombre: ${arg.name}`);
})

emitter.emit('eventWithArgument', {
    id:123,
    name:'erik'
})

emitter.on('eventWithArrow', (arg) => {
    console.log(`With arrow`);
})

emitter.emit('eventWithArrow', {
    id:123,
    name:'erik'
})