'use strict';

var generateReport = require('../lib/generatereport')
  , assert = require('assert')
  ;

describe('generateReport - inputs', function(){

  it('it requires an options object', function(done){

    var opts = false;

    generateReport(opts, function(err, data){
      assert.throws(function(){
          if(err) throw err;
        }, function(err){
          if((err instanceof Error) && /Missing required input: options/.test(err)){
            return true
          }
        },
        "Unexpected error"
      );
      done();
    });

  });

});