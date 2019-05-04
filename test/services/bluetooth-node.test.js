const assert = require('assert');
const app = require('../.././/app');

describe('\'bluetooth-node\' service', () => {
  it('registered the service', () => {
    const service = app.service('bluetooth-node');

    assert.ok(service, 'Registered the service');
  });
});
