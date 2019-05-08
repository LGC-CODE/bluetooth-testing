const assert = require('assert');
const app = require('../.././/app');

describe('\'luis\' service', () => {
  it('registered the service', () => {
    const service = app.service('luis');

    assert.ok(service, 'Registered the service');
  });
});
