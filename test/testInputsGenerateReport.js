'use strict';

var generateReport = require('../lib/generatereport');
var assert = require('assert');

describe('generateReport - inputs', function() {

  it('it requires an options object', function(done) {

    var opts = false;

    generateReport(opts, function(err, data) {
      assert.throws(function() {
          if (err) {
            throw err;
          } else {
            console.log(data);
          }
        }, function(err) {
          if ((err instanceof Error) && /Missing required input: options/.test(err)) {
            return true;
          }
        },
        'Unexpected error'
      );
      done();
    });
  });

  it('it requires options.urls to exist', function(done) {

    var opts = {
      urls: false
    };

    generateReport(opts, function(err, data) {
      assert.throws(function() {
          if (err) {
            throw err;
          } else {
            console.log(data);
          }
        }, function(err) {
          if ((err instanceof Error) && /Missing required input: options.urls/.test(err)) {
            return true;
          }
        },
        'Unexpected error'
      );
      done();
    });
  });

  it('it requires options.apikey to exist', function(done) {

    var opts = {
      urls: true,
      apikey:false
    };

    generateReport(opts, function(err, data) {
      assert.throws(function() {
          if (err) {
            throw err;
          } else {
            console.log(data);
          }
        }, function(err) {
          if ((err instanceof Error) && /Missing required input: options.apikey/.test(err)) {
            return true;
          }
        },
        'Unexpected error'
      );
      done();
    });
  });
});
