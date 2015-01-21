'use strict';

var mkCsvFromArray = require('../lib/mkcsvfromarray');
var assert = require('assert');

describe('mkCsvFromArray - inputs', function() {
  it('it requires an array', function() {
    var arr = false;
    var csv = mkCsvFromArray(arr);
    var errMsg = new Error('Invalid input. Expected an array.');
    assert.equal(csv, errMsg);
  });
});
