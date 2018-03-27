/* eslint-env mocha */

'use strict'

describe('Test of DynamoDB operations', function() {
  const AWS = require('aws-sdk')
  AWS.config.update({region: 'ap-northeast-1'})
  const ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'})
  const tableName = 'deleteme'

  it('#putItem', function(done) {
    const params = {
      TableName: tableName,
      Item: {
        Author: {S: 'Joe SHI'},
        Title: {S: 'Go back to Australia'},
        Country: {S: 'Australia'},
        Province: {S: 'VIC'},
        Deleted: {BOOL: true}
      }
    }

    ddb.putItem(params).promise().then(() => {
      done()
    }).catch((err) => {
      done(err)
    })
  })

  it('#query', function(done) {
    ddb.query({
      TableName: tableName,
      ExpressionAttributeValues: {
        ':Author': {
          S: 'Joe SHI'
        }
      },
      KeyConditionExpression: 'Author = :Author'
    }).promise().then(() => {
      done()
    }).catch((err) => {
      done(err)
    })
  })

  it('#getItem', function(done) {
    ddb.getItem({
      TableName: tableName,
      Key: {
        Author: {
          S: 'Joe SHI'
        },
        Title: {
          S: 'Go back to Australia'
        }
      }
    }).promise().then(() => {
      done()
    }).catch((err) => {
      done(err)
    })
  })

  it('#queryLocalIndex', function(done) {
    ddb.query({
      TableName: tableName,
      IndexName: 'Country-Province-index',
      ExpressionAttributeValues: {
        ':Country': {
          S: 'Australia'
        },
        ':Province': {
          S: 'VIC'
        }
      },
      KeyConditionExpression: 'Country = :Country and Province = :Province'
    }).promise().then(() => {
      done()
    }).catch((err) => {
      done(err)
    })
  })
})
