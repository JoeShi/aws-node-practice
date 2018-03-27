'use strict'

// const uuidv1 = require('uuid/v1')
const AWS = require('aws-sdk')
AWS.config.update({region: 'ap-northeast-1'})

const ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'})


