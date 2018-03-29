'use strict'

const Memcached = require('memcached')

const memcached = new Memcached([
  'memcached-2.saqbbs.0001.apse1.cache.amazonaws.com',
  'memcached-2.saqbbs.0002.apse1.cache.amazonaws.com',
  'memcached-2.saqbbs.0003.apse1.cache.amazonaws.com'
])

memcached.set('key1', 'value1', 100, function(err, data) {
  if (err) {
    console.error(err)
  } else {
    console.log(data)
  }
})

memcached.get('key1', function(err, data) {
  if (err) {
    console.error(err)
  } else {
    console.log(data)
  }
})
