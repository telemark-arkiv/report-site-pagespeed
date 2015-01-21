'use strict';

var mkCsvFromArray = require('../lib/mkcsvfromarray');
var assert = require('assert');

describe('mkCsvFromArray - input', function() {
  it('it requires an array', function() {
    var arr = false;
    var csv = mkCsvFromArray(arr);
    var errMsg = 'Invalid input. Expected an array.';
    assert.equal(csv.message, errMsg);
  });
});

describe('mkCsvFromArray - output', function() {
  it('it returns as expected', function() {
    var arr = ['Ole', 'Dole', 'Doffen'];
    var csv = mkCsvFromArray(arr);
    var output = '"Ole","Dole","Doffen"\r\n';
    assert.equal(csv, output);
  });
});
