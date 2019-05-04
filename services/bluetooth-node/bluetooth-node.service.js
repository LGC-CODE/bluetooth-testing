// Initializes the `bluetooth-node` service on path `/bluetooth-node`
const createService = require('./bluetooth-node.class.js');
const hooks = require('./bluetooth-node.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/bluetooth-node', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('bluetooth-node');

  service.hooks(hooks);
};
