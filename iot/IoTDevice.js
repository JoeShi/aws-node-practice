'use strict'

const awsIot = require('aws-iot-device-sdk')
const EventEmitter = require('events').EventEmitter

/**
 * Describe a AWS IoT Device
 */
class IoTDevice extends EventEmitter {
  /**
   * Initialize a IoTDevice
   * @param {String} thingType thing type
   * @param {String} thingName thing name
   * @param {String} keyPath path to the private key
   * @param {String} certPath path to the certificate
   * @param {String} caPath path to the CA certificate
   * @param {String} host custom endpoint
   * @param {Array} topics The topics array to subscribe
   */
  constructor(thingType, thingName, keyPath, certPath, caPath, host, topics = null) {
    super()
    this.thingType = thingType
    this.thingName = thingName
    this.keyPath = keyPath
    this.certPath = certPath
    this.caPath = caPath
    this.host = host
    this.topics = topics
    if (this.thingName) {
      this.clientId = thingName
    }
  }

  /**
   * Connect to the Alicloud IoT service
   */
  connect() {
    const self = this
    self.client = awsIot.device({
      keyPath: self.keyPath,
      certPath: self.certPath,
      caPath: self.caPath,
      clientId: self.clientId,
      host: self.host
    })
    self.client.on('connect', () => {
      self.emit('connect')
      console.info('connected to the AWS IoT Device Gateway via MQTT')
      if (self.topics && self.topics.length > 0) {
        self.topics.forEach(topic => {
          self.client.subscribe(topic)
        })
      }
    })
    self.client.on('offline', () => {
      console.info('go offline...')
    })
    self.client.on('error', err => {
      console.error('error', err)
    })
    self.client.on('message', (topic, message) => {
      let jsonMessage = message.toString()
      console.log(jsonMessage)
      try {
        jsonMessage = JSON.parse(jsonMessage)
      } catch (err) {
        self.emit('error', new Error('Not a valid json message'))
        return console.error(err)
      }
      self.emit(topic, jsonMessage)
    })
  }

  /**
   * Close the connection to AWS IoT service
   */
  close() {
    this.client.end()
  }
}

module.exports = IoTDevice
