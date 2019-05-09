var async = require('async');
var noble = require('noble');
const periphs = [];
let periph = 0;

var peripheralIdOrAddress = true;

noble.on('stateChange', function (state) {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function (peripheral) {
  // periphs.push(peripheral);
  handlePeriphs(peripheral);
});

setTimeout(function () {
  // console.log(periphs);
  noble.stopScanning();
}, 10000);

noble.on('scanStop', () => {
  
});

function handlePeriphs(peripheral) {
  // const donePeriph = new Promise((resolve, reject) => {
    console.log('peripheral with ID ' + peripheral.id + ' found');
    var advertisement = peripheral.advertisement;

    var localName = advertisement.localName;
    var txPowerLevel = advertisement.txPowerLevel;
    var manufacturerData = advertisement.manufacturerData;
    var serviceData = advertisement.serviceData;
    var serviceUuids = advertisement.serviceUuids;

    if (localName) {
      console.log('  Local Name        = ' + localName);
    }

    if (txPowerLevel) {
      console.log('  TX Power Level    = ' + txPowerLevel);
    }

    if (manufacturerData) {
      console.log('  Manufacturer Data = ' + manufacturerData.toString('hex'));
    }

    if (serviceData) {
      console.log('  Service Data      = ' + JSON.stringify(serviceData, null, 2));
    }

    if (serviceUuids) {
      console.log('  Service UUIDs     = ' + serviceUuids);
    }

    console.log();

    explore(peripheral);
      // resolve(handlePeriphs);
    // }).catch((err) => {
      // reject(err);
    // });

  // return donePeriph;
  // return donePeriph.then((handlePeriphs)=> {
  //   periph++;
  //   console.log('next periph ' + periphs[periph].id);
  //   if (periphs[periph]) {
  //     setTimeout(() => {
  //       handlePeriphs(periphs[periph]);
  //     }, 2000);
  //   }
  // }).catch((err) => {
  //   console.log(err);
  // });;
}

function explore(peripheral) {
  // const solvePeriphs = new Promise((resolve, reject) => {
    console.log('services and characteristics:');

    peripheral.on('disconnect', function () {
      console.log('disconnect');
      // resolve();
    });

    peripheral.connect(function (error) {
      peripheral.discoverServices([], function (error, services) {
        var serviceIndex = 0;

        async.whilst(
          function () {
            return (serviceIndex < services.length);
          },
          function (callback) {
            var service = services[serviceIndex];
            var serviceInfo = service.uuid;

            if (service.name) {
              serviceInfo += ' (' + service.name + ')';
            }
            console.log(serviceInfo);

            service.discoverCharacteristics([], function (error, characteristics) {
              var characteristicIndex = 0;

              async.whilst(
                function () {
                  return (characteristicIndex < characteristics.length);
                },
                function (callback) {
                  var characteristic = characteristics[characteristicIndex];
                  var characteristicInfo = '  ' + characteristic.uuid;

                  if (characteristic.name) {
                    characteristicInfo += ' (' + characteristic.name + ')';
                  }

                  async.series([
                    function (callback) {
                      characteristic.discoverDescriptors(function (error, descriptors) {
                        async.detect(
                          descriptors,
                          function (descriptor, callback) {
                            if (descriptor.uuid === '2901') {
                              return callback(descriptor);
                            } else {
                              return callback();
                            }
                          },
                          function (userDescriptionDescriptor) {
                            if (userDescriptionDescriptor) {
                              userDescriptionDescriptor.readValue(function (error, data) {
                                if (data) {
                                  characteristicInfo += ' (' + data.toString() + ')';
                                }
                                callback();
                              });
                            } else {
                              callback();
                            }
                          }
                        );
                      });
                    },
                    function (callback) {
                      characteristicInfo += '\n    properties  ' + characteristic.properties.join(', ');

                      if (characteristic.properties.indexOf('read') !== -1) {
                        characteristic.read(function (error, data) {
                          if (data) {
                            var string = data.toString('ascii');

                            characteristicInfo += '\n    value       ' + data.toString('hex') + ' | \'' + string + '\'';
                          }
                          callback();
                        });
                      } else {
                        callback();
                      }
                    },
                    function () {
                      console.log(characteristicInfo);
                      characteristicIndex++;
                      callback();
                    }
                  ]);
                },
                function (error) {
                  serviceIndex++;
                  callback();
                }
              );
            });
          },
          function (err) {
            // reject(err);
            peripheral.disconnect();
          }
        );
      });
    });
  // });

  // return solvePeriphs;
}
