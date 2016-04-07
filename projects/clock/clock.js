var extend = require('xtend')
var Observ = require('observ')
var Struct = require('observ-struct')
var Store = require('weakmap-shim/create-store')

var Intervals = Store()

module.exports = Clock

function Clock (time) {
  time = extend({
    hours: 0,
    minutes: 0,
    seconds: 0
  }, time)

  return Struct({
    hours: Observ(time.hours),
    minutes: Observ(time.minutes),
    seconds: Observ(time.seconds)
  })
}

Clock.start = function start (state) {
  Clock.stop(state)
  var key = Intervals(state)
  key.interval = setInterval(function () {
    Clock.tick(state)
  }, 1000)
  return state
}

Clock.stop = function stop (state) {
  var key = Intervals(state)
  clearInterval(key.interval)
  return state
}

Clock.tick = function state (state) {
  var oldTime = state()
  var newTime = setTime(oldTime)
  state.set(newTime)
}

Clock.onTick = function onTick (state, cb) {
  state(cb)
}

function setTime (state) {
  var hours = state.hours
  var minutes = state.minutes
  var seconds = state.seconds

  seconds = (seconds + 1) % 60
  if (seconds === 0) {
    minutes = (minutes + 1) % 60
    if (minutes === 0) {
      hours = (hours + 1) % 12
    }
  }

  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}
