'use strict'

var test = require('tape')

var Clock = require('./clock')

test('clock is a function', function (assert) {
  assert.equal(typeof Clock, 'function')
  assert.end()
})

test('you are a real clock now', function (assert) {
  var time = {
    hours: 12,
    minutes: 0,
    seconds: 0
  }
  var clock = Clock(time)
  assert.deepEqual(clock(), time)
  assert.end()
})

test('clocks will tick', function (assert) {
  var time = {
    hours: 12,
    minutes: 59,
    seconds: 59
  }
  var clock = Clock(time)
  Clock.onTick(clock, function (state) {
    assert.equal(state.hours, 1)
    assert.equal(state.minutes, 0)
    assert.equal(state.seconds, 0)
    Clock.stop(clock)
    assert.end()
  })
  Clock.tick(clock)
})

test('clocks should stop', function (assert) {
  var count = 0
  var time = {
    hours: 12,
    minutes: 59,
    seconds: 59
  }
  var clock = Clock(time)
  Clock.onTick(clock, function (state) {
    count++
    if (count === 2) {
      Clock.stop(clock)
      assert.deepEqual(clock(), {
        hours: 1,
        minutes: 0,
        seconds: 1
      })
      assert.end()
    }
  })
  Clock.tick(clock)
  Clock.start(clock)
  Clock.tick(clock)
})
