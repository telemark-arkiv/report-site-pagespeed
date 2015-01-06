'use strict';

function generateReport(options, callback){
  if(!options){
    return callback(new Error('Missing required input: options'), null);
  }
}

module.exports = generateReport;