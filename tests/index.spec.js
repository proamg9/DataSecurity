const request = require('request');
const { expect } = require('chai');


// Server
describe('Root endpoint response', () => {
  it('should return 404', (done) => {
    request.get("http://localhost:8000/", (err, res) => {
      if (err) throw err;
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
});
