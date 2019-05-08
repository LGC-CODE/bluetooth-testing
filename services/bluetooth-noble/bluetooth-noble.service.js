// Initializes the `bluetooth-noble` service on path `/bluetooth-noble`
const createService = require('./bluetooth-noble.class.js');
const hooks = require('./bluetooth-noble.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/bluetooth-noble', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('bluetooth-noble');

  service.hooks(hooks);
};
