'use strict';

var fs = require('fs')
  , events = require('events')
  , stream = require('stream')
  , gps = require('gpagespeed')
  , mkCsvFromArray = require('./mkcsvfromarray')
  , tracker = new events.EventEmitter()
  , jobCounter = 0
  , urlsCounter = 0
  , errors = []
  , reportHeaders = {
      'desktop' : ['url', 'speed'],
      'mobile' : ['url', 'speed', 'usability']
  }
  , verbose
  , apiversion
  , key
  , strategy
  , fileName
  , writeStream
  , readStream
  ;

function generateReport(options, callback){

  if(!options){
    return callback(new Error('Missing required input: options'), null);
  }

  if(!options.urls){
    return callback(new Error('Missing required input: options.urls'), null);
  }

  if(!options.apikey){
    return callback(new Error('Missing required input: options.apikey'), null);
  }

  verbose = options.verbose;
  apiversion = options.apiversion || 'v3beta1';
  key = options.apikey;
  strategy = options.strategy || 'mobile';
  fileName = options.fileName || 'report.csv';
  urlsCounter = options.urls.length;
  writeStream = fs.createWriteStream(fileName);
  readStream = stream.PassThrough();

  readStream.pipe(writeStream);

  readStream.push(mkCsvFromArray(reportHeaders[strategy]));

  tracker.on('row', function(row){
    if(row.length > 0){
      readStream.push(mkCsvFromArray(row));
    }
    jobCounter++;
    if(verbose){
      console.log(jobCounter);
    }
    if(jobCounter === urlsCounter){
      tracker.emit('finished');
    }
  });

  tracker.on('finished', function(){
    return callback(null, {message:'Finished!', urls: urlsCounter, errors:errors});
  });

  options.urls.forEach(function(url){
    gps({url:url, key:key, strategy:strategy, userequest:true, apiversion:apiversion}, function(error, data){
      var result
        ;

      if(error){
        errors.push({url:url, error:error});
        tracker.emit('row', []);
      } else {
        result = JSON.parse(data);
        if(strategy === 'mobile'){
          tracker.emit('row', [url, result.ruleGroups.SPEED.score, result.ruleGroups.USABILITY.score]);
        } else {
          tracker.emit('row', [url, result.ruleGroups.SPEED.score]);
        }
      }
    })
  });
}

module.exports = generateReport;