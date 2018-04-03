'use strict'

const IoTDevice = require('./IoTDevice')

const device = new IoTDevice('Lamp', 'lamp-1', './private.pem.key', './certificate.pem.crt', './CA.pem', 'abty4kifln98q.iot.ap-northeast-1.amazonaws.com')

device.connect()

