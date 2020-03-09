const EventEmitter = require('events')
const emitter = new EventEmitter()


emitter.on('messageLoaded', (arg)=> {
    console.log('listened called ', arg)
})

//Raise an event
emitter.emit('messageLoaded', {id: 1, url: 'http:'})

const log = require('./logger')
log('hello')

