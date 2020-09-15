const { expect } = require('chai');
const db = require('../lib/db');

// DB
describe('DB Connect', () => {
  it('expect "connect" to be a function', (done) => {
    expect(typeof (db.connect)).to.be.equals('function');
    done();
  });
  it('expect "connect" to not throw', (done) => {
    expect(db.connect).to.not.throw();
    db.close();
    done();
  });
});

describe('DB Close', () => {
  it('expect "close" to be a function', (done) => {
    expect(typeof (db.close)).to.be.equals('function');
    done();
  });
  it('expect "close" to not throw', (done) => {
    expect(db.close).to.not.throw();
    done();
  });
});
