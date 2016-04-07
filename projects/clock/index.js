'use strict'

module.exports = {
  container: require('./clock'),
  component: noop
}

function noop () {
  return function render () {
    return 'nooop yet'
  }
}
