// Initializes the `bluetooth-bleno` service on path `/bluetooth-bleno`
const createService = require('./bluetooth-bleno.class.js');
const hooks = require('./bluetooth-bleno.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/bluetooth-bleno', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('bluetooth-bleno');

  service.hooks(hooks);
};
