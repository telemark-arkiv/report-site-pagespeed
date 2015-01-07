'use strict';

function generateReport(options, callback){

  if(!options){
    return callback(new Error('Missing required input: options'), null);
  }

  if(!options.urls){
    return callback(new Error('Missing required input: options.urls'), null);
  }
}

module.exports = generateReport;