/* eslint-env mocha */

'use strict'

describe('Test of Glacier operations', function() {
  this.timeout(5000)
  const AWS = require('aws-sdk')
  AWS.config.update({region: 'ap-northeast-1'})
  const glacier = new AWS.Glacier({apiVersion: '2012-06-01'})
  const vaultName = 'mb-vault'

  it('#uploadArchieve', function(done) {
    const fs = require('fs')
    const file = fs.readFileSync('./README.md')
    glacier.uploadArchive({
      vaultName: vaultName,
      body: file
    }).promise().then((data) => {
      console.log(data)
      done()
    }).catch((err) => {
      done(err)
    })
  })

  it('#archival-retrieval', function(done) {
    const params = {
      vaultName: vaultName,
      jobParameters: {
        Description: 'get the archival object',
        Type: 'archive-retrieval',
        ArchiveId: 'iFs_9O2_SssdeLeC_4TtmLLxILTIudVnsRY3pkaU89Ik9UAVYbNB5qWZ1xBvg5kSqRPIwPIdFGk2ZIv6b-F1K-ftsdqiX_e-8n8sXdEdkyDfKGIXekugQGNzsatoll3AybXzE_GTHw',
        Tier: 'Expedited'
      }
    }
    glacier.initiateJob(params).promise().then((data) => {
      console.log(data)
      done()
    }).catch((err) => {
      done(err)
    })
  })

  it('#getJobOutput', function(done) {
    const params = {
      jobId: '0bdGPCrZJzdfwr_pXyP3nFX8s4_bAr-DZP4oyb3EF_NpGLWQHtRXTvly_fv0O8GxNsmcwqdEI-YvIkuL0uMZBN4HvAES',
      vaultName: vaultName
    }
    glacier.getJobOutput(params).promise().then(() => {
      done()
    }).catch((err) => {
      done(err)
    })
  })
})
