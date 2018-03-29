'use strict'

const Redis = require('ioredis')

const cluster = new Redis.Cluster(
  [{
    port: 6379,
    host: 'redis-2.saqbbs.clustercfg.apse1.cache.amazonaws.com'
  }], {
    scaleReads: 'slave'
  })

const aArray = []

for (let index = 1; index < 10000; index++) {
  aArray.push({
    key: 'key' + index,
    value: 'value' + index
  })
}

aArray.forEach(item => {
  cluster.set(item.key, item.value)
})

