// Initializes the `luis` service on path `/luis`
const createService = require('./luis.class.js');
const hooks = require('./luis.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/luis', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('luis');

  service.hooks(hooks);
};
