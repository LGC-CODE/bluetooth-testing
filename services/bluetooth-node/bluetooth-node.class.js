/* eslint-disable no-unused-vars */

const bluetooth = require('node-bluetooth');
const device = new bluetooth.DeviceINQ();

device
.on('finished', console.log.bind(console, 'finished'))
.on('found', function found(address, name){

  console.log('Found: ' + address + ' with name ' + name);

  // find serial port channel
  device.findSerialPortChannel(address, function(channel){
    console.log('Found RFCOMM channel for serial port on %s: ', name, channel);

    // make bluetooth connect to remote device
    bluetooth.connect(address, channel, function(err, connection){
      if(err) return console.error(err);

      connection.delimiter = Buffer.from('\n', 'utf8');
      connection.on('data', (buffer) => {
        console.log('received message:', buffer.toString());
      });

      connection.write(new Buffer('Hello!', 'utf-8'), () => {
        console.log('wrote');
      });
    });

  });

})

// console.log(device);

/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    return [];
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;


module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
