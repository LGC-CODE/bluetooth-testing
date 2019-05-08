const bluetoothNode = require('./bluetooth-node/bluetooth-node.service.js');
const luis = require('./luis/luis.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(bluetoothNode);
  // app.configure(bluetoothNoble);
  // app.configure(bluetoothBleno);
  app.configure(luis);
};
