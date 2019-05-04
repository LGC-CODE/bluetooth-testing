const bluetoothNode = require('./bluetooth-node/bluetooth-node.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(bluetoothNode);
};
